/**
 * Analytics service for tracking usage patterns
 * All data is stored locally in IndexedDB
 */

import { openDB } from 'idb';

const DB_NAME = 'shikshak-analytics';
const DB_VERSION = 1;

async function getAnalyticsDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Daily usage store
            if (!db.objectStoreNames.contains('dailyUsage')) {
                const store = db.createObjectStore('dailyUsage', { keyPath: 'date' });
                store.createIndex('date', 'date');
            }
            // Event log store
            if (!db.objectStoreNames.contains('events')) {
                const eventStore = db.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
                eventStore.createIndex('timestamp', 'timestamp');
                eventStore.createIndex('type', 'type');
            }
        }
    });
}

/**
 * Track an event
 */
export async function trackEvent(type, data = {}) {
    try {
        const db = await getAnalyticsDB();
        await db.add('events', {
            type,
            data,
            timestamp: new Date().toISOString()
        });
        await updateDailyStats(type);
    } catch (error) {
        console.error('Analytics error:', error);
    }
}

/**
 * Update daily usage stats
 */
async function updateDailyStats(eventType) {
    const db = await getAnalyticsDB();
    const today = new Date().toISOString().split('T')[0];

    let daily = await db.get('dailyUsage', today);
    if (!daily) {
        daily = {
            date: today,
            questionsAsked: 0,
            lessonsViewed: 0,
            videosWatched: 0,
            scenariosUsed: 0,
            totalEvents: 0
        };
    }

    // Update based on event type
    switch (eventType) {
        case 'question_asked':
            daily.questionsAsked++;
            break;
        case 'lesson_viewed':
            daily.lessonsViewed++;
            break;
        case 'video_watched':
            daily.videosWatched++;
            break;
        case 'scenario_used':
            daily.scenariosUsed++;
            break;
    }
    daily.totalEvents++;

    await db.put('dailyUsage', daily);
}

/**
 * Get usage stats for a date range
 */
export async function getUsageStats(daysBack = 30) {
    try {
        const db = await getAnalyticsDB();
        const allDays = await db.getAll('dailyUsage');

        // Get last N days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysBack);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];

        const recentDays = allDays.filter(d => d.date >= cutoffStr);

        // Calculate totals
        const totals = {
            questionsAsked: 0,
            lessonsViewed: 0,
            videosWatched: 0,
            scenariosUsed: 0,
            totalEvents: 0,
            daysActive: recentDays.length,
            currentStreak: calculateStreak(allDays)
        };

        recentDays.forEach(day => {
            totals.questionsAsked += day.questionsAsked || 0;
            totals.lessonsViewed += day.lessonsViewed || 0;
            totals.videosWatched += day.videosWatched || 0;
            totals.scenariosUsed += day.scenariosUsed || 0;
            totals.totalEvents += day.totalEvents || 0;
        });

        return {
            totals,
            dailyData: recentDays,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Failed to get stats:', error);
        return {
            totals: {
                questionsAsked: 0,
                lessonsViewed: 0,
                videosWatched: 0,
                scenariosUsed: 0,
                totalEvents: 0,
                daysActive: 0,
                currentStreak: 0
            },
            dailyData: [],
            lastUpdated: new Date().toISOString()
        };
    }
}

/**
 * Calculate active streak
 */
function calculateStreak(allDays) {
    if (allDays.length === 0) return 0;

    // Sort by date descending
    const sorted = [...allDays].sort((a, b) => b.date.localeCompare(a.date));

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if active today or yesterday
    if (sorted[0].date !== today && sorted[0].date !== yesterday) {
        return 0;
    }

    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
        const prevDate = new Date(sorted[i - 1].date);
        const currDate = new Date(sorted[i].date);
        const dayDiff = (prevDate - currDate) / 86400000;

        if (dayDiff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Get popular topics
 */
export async function getPopularTopics() {
    try {
        const db = await getAnalyticsDB();
        const events = await db.getAllFromIndex('events', 'type');

        const topics = {};
        events
            .filter(e => e.type === 'question_asked' && e.data?.category)
            .forEach(e => {
                topics[e.data.category] = (topics[e.data.category] || 0) + 1;
            });

        return Object.entries(topics)
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    } catch (error) {
        return [];
    }
}

/**
 * Clear all analytics data
 */
export async function clearAnalytics() {
    const db = await getAnalyticsDB();
    await db.clear('dailyUsage');
    await db.clear('events');
}

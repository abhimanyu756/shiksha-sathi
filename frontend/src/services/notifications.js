/**
 * Push Notification Service
 * Handles browser push notifications for reminders and updates
 */

/**
 * Check if notifications are supported
 */
export function isNotificationSupported() {
    return 'Notification' in window;
}

/**
 * Get current notification permission status
 */
export function getNotificationPermission() {
    if (!isNotificationSupported()) return 'unsupported';
    return Notification.permission;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission() {
    if (!isNotificationSupported()) {
        return { success: false, reason: 'unsupported' };
    }

    try {
        const permission = await Notification.requestPermission();
        return {
            success: permission === 'granted',
            permission
        };
    } catch (error) {
        console.error('Notification permission error:', error);
        return { success: false, reason: 'error' };
    }
}

/**
 * Send a local notification
 */
export function sendNotification(title, options = {}) {
    if (!isNotificationSupported() || Notification.permission !== 'granted') {
        return null;
    }

    const defaultOptions = {
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        vibrate: [100, 50, 100],
        tag: 'shikshak-saathi',
        renotify: true,
        ...options
    };

    try {
        const notification = new Notification(title, defaultOptions);

        notification.onclick = () => {
            window.focus();
            notification.close();
            if (options.onClick) options.onClick();
        };

        return notification;
    } catch (error) {
        console.error('Notification error:', error);
        return null;
    }
}

/**
 * Schedule a reminder notification
 */
export function scheduleReminder(title, body, delayMs, language = 'en') {
    if (!isNotificationSupported() || Notification.permission !== 'granted') {
        return null;
    }

    const titles = {
        dailyReminder: {
            en: '📚 Daily Teaching Tip',
            hi: '📚 आज की शिक्षण टिप',
            ta: '📚 தினசரி கற்பித்தல் உதவிக்குறிப்பு',
            te: '📚 రోజువారీ బోధనా చిట్కా'
        },
        streakReminder: {
            en: '🔥 Keep Your Streak!',
            hi: '🔥 अपनी स्ट्रीक बनाए रखें!',
            ta: '🔥 உங்கள் தொடர்ச்சியை வைத்திருங்கள்!',
            te: '🔥 మీ స్ట్రీక్ కొనసాగించండి!'
        }
    };

    const timeoutId = setTimeout(() => {
        sendNotification(title, {
            body,
            data: { type: 'reminder' }
        });
    }, delayMs);

    return timeoutId;
}

/**
 * Cancel a scheduled reminder
 */
export function cancelReminder(timeoutId) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
}

/**
 * Send a welcome notification after enabling
 */
export function sendWelcomeNotification(language = 'en') {
    const messages = {
        en: {
            title: '🎉 Notifications Enabled!',
            body: 'You\'ll receive helpful teaching tips and reminders.'
        },
        hi: {
            title: '🎉 सूचनाएं सक्रिय!',
            body: 'आपको उपयोगी शिक्षण टिप्स और रिमाइंडर मिलेंगे।'
        },
        ta: {
            title: '🎉 அறிவிப்புகள் இயக்கப்பட்டன!',
            body: 'பயனுள்ள கற்பித்தல் குறிப்புகள் கிடைக்கும்.'
        },
        te: {
            title: '🎉 నోటిఫికేషన్లు ప్రారంభించబడ్డాయి!',
            body: 'మీకు ఉపయోగకరమైన బోధనా చిట్కాలు అందుతాయి.'
        }
    };

    const msg = messages[language] || messages['en'];
    return sendNotification(msg.title, { body: msg.body });
}

/**
 * Daily tips that can be sent as notifications
 */
export const DAILY_TIPS = [
    {
        en: 'Try a clap pattern to get attention - students love repeating rhythms!',
        hi: 'ध्यान आकर्षित करने के लिए ताली का पैटर्न आज़माएं!'
    },
    {
        en: 'Use local objects (stones, leaves) to teach counting.',
        hi: 'गिनती सिखाने के लिए स्थानीय वस्तुएं (पत्थर, पत्ते) उपयोग करें।'
    },
    {
        en: 'Pair a strong reader with a struggling one for buddy reading.',
        hi: 'बडी रीडिंग के लिए मज़बूत पाठक को कमज़ोर के साथ जोड़ें।'
    },
    {
        en: 'End each lesson with "What did we learn today?" question.',
        hi: 'हर पाठ "आज हमने क्या सीखा?" सवाल से समाप्त करें।'
    },
    {
        en: 'Movement breaks help students focus better. Try a quick stretch!',
        hi: 'गतिविधि विराम छात्रों को बेहतर ध्यान देने में मदद करता है।'
    }
];

/**
 * Get a random daily tip
 */
export function getRandomTip(language = 'en') {
    const tip = DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)];
    return tip[language] || tip['en'];
}

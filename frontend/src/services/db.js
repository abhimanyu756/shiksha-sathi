import { openDB } from 'idb';

const DB_NAME = 'shikshak-saathi';
const DB_VERSION = 1;

/**
 * Initialize the IndexedDB database
 */
async function getDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Chat history store
            if (!db.objectStoreNames.contains('chats')) {
                const chatStore = db.createObjectStore('chats', { keyPath: 'id', autoIncrement: true });
                chatStore.createIndex('timestamp', 'timestamp');
            }

            // Cached responses store
            if (!db.objectStoreNames.contains('cache')) {
                const cacheStore = db.createObjectStore('cache', { keyPath: 'query' });
                cacheStore.createIndex('timestamp', 'timestamp');
            }

            // Pending queries store (for offline sync)
            if (!db.objectStoreNames.contains('pending')) {
                db.createObjectStore('pending', { keyPath: 'id', autoIncrement: true });
            }

            // Settings store
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
        },
    });
}

// ============ Chat History ============

/**
 * Save a chat session
 */
export async function saveChat(messages, title = null) {
    const db = await getDB();
    const chat = {
        messages,
        title: title || messages[0]?.content?.substring(0, 50) + '...',
        timestamp: new Date().toISOString(),
    };
    return db.add('chats', chat);
}

/**
 * Get all chat sessions
 */
export async function getAllChats() {
    const db = await getDB();
    return db.getAllFromIndex('chats', 'timestamp');
}

/**
 * Get a single chat by ID
 */
export async function getChat(id) {
    const db = await getDB();
    return db.get('chats', id);
}

/**
 * Delete a chat session
 */
export async function deleteChat(id) {
    const db = await getDB();
    return db.delete('chats', id);
}

// ============ Response Cache ============

/**
 * Cache a response for offline use
 */
export async function cacheResponse(query, response) {
    const db = await getDB();
    const cacheItem = {
        query: query.toLowerCase().trim(),
        response,
        timestamp: new Date().toISOString(),
    };
    return db.put('cache', cacheItem);
}

/**
 * Get a cached response if available
 */
export async function getCachedResponse(query) {
    const db = await getDB();
    return db.get('cache', query.toLowerCase().trim());
}

/**
 * Clear old cache entries (older than 7 days)
 */
export async function clearOldCache() {
    const db = await getDB();
    const tx = db.transaction('cache', 'readwrite');
    const store = tx.objectStore('cache');
    const index = store.index('timestamp');

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);

    let cursor = await index.openCursor();
    while (cursor) {
        if (new Date(cursor.value.timestamp) < cutoff) {
            await cursor.delete();
        }
        cursor = await cursor.continue();
    }
}

// ============ Pending Queries ============

/**
 * Queue a query for later sync
 */
export async function queuePendingQuery(query) {
    const db = await getDB();
    return db.add('pending', {
        query,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Get all pending queries
 */
export async function getPendingQueries() {
    const db = await getDB();
    return db.getAll('pending');
}

/**
 * Clear a pending query after sync
 */
export async function clearPendingQuery(id) {
    const db = await getDB();
    return db.delete('pending', id);
}

// ============ Settings ============

/**
 * Save a setting
 */
export async function saveSetting(key, value) {
    const db = await getDB();
    return db.put('settings', { key, value });
}

/**
 * Get a setting
 */
export async function getSetting(key) {
    const db = await getDB();
    const result = await db.get('settings', key);
    return result?.value;
}

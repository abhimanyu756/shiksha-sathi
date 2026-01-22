const API_BASE = '/api';

/**
 * Send a coaching query and get AI response
 */
export async function askCoach(query, conversationHistory = [], language = 'en') {
    try {
        const response = await fetch(`${API_BASE}/coaching/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                conversationHistory,
                language,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get coaching response');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Get coaching scenarios
 */
export async function getScenarios(language = 'en') {
    try {
        const response = await fetch(`${API_BASE}/coaching/scenarios?language=${language}`);

        if (!response.ok) {
            throw new Error('Failed to get scenarios');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Get coaching status (AI availability)
 */
export async function getCoachingStatus() {
    try {
        const response = await fetch(`${API_BASE}/coaching/status`);

        if (!response.ok) {
            throw new Error('Failed to get status');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Get micro-lessons
 */
export async function getMicroLessons(language = 'en', category = null) {
    try {
        let url = `${API_BASE}/resources/micro-lessons?language=${language}`;
        if (category) {
            url += `&category=${category}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to get micro-lessons');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Get a specific micro-lesson
 */
export async function getMicroLesson(id, language = 'en') {
    try {
        const response = await fetch(`${API_BASE}/resources/micro-lessons/${id}?language=${language}`);

        if (!response.ok) {
            throw new Error('Failed to get lesson');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Get resource categories
 */
export async function getCategories(language = 'en') {
    try {
        const response = await fetch(`${API_BASE}/resources/categories?language=${language}`);

        if (!response.ok) {
            throw new Error('Failed to get categories');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

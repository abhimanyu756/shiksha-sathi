import { GoogleGenerativeAI } from '@google/generative-ai';
import { COACHING_SYSTEM_PROMPT } from './prompts.js';

let genAI = null;
let model = null;

/**
 * Initialize Gemini API client
 */
export function initializeGemini(apiKey) {
    if (!apiKey) {
        console.warn('⚠️ Gemini API key not provided. AI features will be disabled.');
        return false;
    }

    try {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: COACHING_SYSTEM_PROMPT
        });
        console.log('✅ Gemini AI initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Gemini:', error.message);
        return false;
    }
}

/**
 * Get coaching response for a teacher's query
 */
export async function getCoachingResponse(query, conversationHistory = []) {
    if (!model) {
        return getFallbackResponse(query);
    }

    try {
        // Filter history to ensure first message is from user (Gemini requirement)
        let filteredHistory = conversationHistory.filter(msg => msg.content && msg.content.trim());
        const firstUserIndex = filteredHistory.findIndex(msg => msg.role === 'user');

        if (firstUserIndex > 0) {
            filteredHistory = filteredHistory.slice(firstUserIndex);
        } else if (firstUserIndex === -1) {
            filteredHistory = [];
        }

        const history = filteredHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            }
        });

        const result = await chat.sendMessage(query);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        return getFallbackResponse(query);
    }
}

/**
 * Fallback responses when AI is unavailable
 */
function getFallbackResponse(query) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('attention') || lowerQuery.includes('ध्यान')) {
        return `**ध्यान आकर्षित करने के लिए / To Get Attention:**

1. **Clap Pattern**: Start a rhythm - students repeat. Simple to complex!
2. **Countdown**: Start loud "5..." get quieter "4...3...2..." whisper "1"
3. **Mystery Object**: Hide something, ask "What's in my hand?"

💡 Try the clap pattern right now - it works instantly!

*Note: AI is currently offline. Connect to internet for personalized coaching.*`;
    }

    if (lowerQuery.includes('zero') || lowerQuery.includes('शून्य') || lowerQuery.includes('borrowing')) {
        return `**शून्य और उधार सिखाने के लिए / Teaching Zero & Borrowing:**

1. **Use Bundles**: 30 sticks in 3 bundles of 10
2. **Ask**: "Can I take 4 from nothing?" No!
3. **Open Bundle**: Unwrap a ten, now take 4 from the 10 loose ones

Key: Zero means "nothing here YET" - we can always unwrap a ten!

*Note: AI is currently offline. Connect to internet for personalized coaching.*`;
    }

    if (lowerQuery.includes('multigrade') || lowerQuery.includes('multi-grade') || lowerQuery.includes('एक साथ')) {
        return `**Multi-Grade Classroom Tips:**

1. **Peer Tutoring**: Older students help younger ones (they learn by teaching!)
2. **Station Rotation**: Different activities at different corners
3. **Common Theme**: Same topic, different complexity levels

Example: All learn about "Animals" - Class 3 draws, Class 4 writes sentences.

*Note: AI is currently offline. Connect to internet for personalized coaching.*`;
    }

    return `Welcome to Shikshak Saathi! 🙏

I'm your teaching companion. While I'm currently working offline, here are some general tips:

1. **Start with a hook** - A question or surprise to grab attention
2. **Use local materials** - Stones, sticks, leaves make great teaching aids
3. **Peer learning** - Let students teach each other
4. **Movement breaks** - A quick stretch refocuses the class

Connect to the internet for personalized, AI-powered coaching responses!

*क्या आप हिंदी में मदद चाहते हैं? बस हिंदी में पूछें!*`;
}

/**
 * Check if Gemini is initialized and ready
 */
export function isGeminiReady() {
    return model !== null;
}

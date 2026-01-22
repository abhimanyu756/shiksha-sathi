import express from 'express';
import { getCoachingResponse, isGeminiReady } from '../services/gemini.js';
import { SCENARIO_PROMPTS } from '../services/prompts.js';

const router = express.Router();

/**
 * POST /api/coaching/ask
 * Get AI coaching response for a teacher's query
 */
router.post('/ask', async (req, res) => {
    try {
        const { query, conversationHistory = [], language = 'en' } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                error: 'Query is required',
                errorHi: 'प्रश्न आवश्यक है'
            });
        }

        if (query.trim().length < 3) {
            return res.status(400).json({
                error: 'Query too short. Please provide more details.',
                errorHi: 'प्रश्न बहुत छोटा है। कृपया अधिक विवरण दें।'
            });
        }

        console.log(`📝 Coaching query received: "${query.substring(0, 50)}..."`);

        const response = await getCoachingResponse(query, conversationHistory);

        res.json({
            success: true,
            response,
            isAIResponse: isGeminiReady(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Coaching error:', error);
        res.status(500).json({
            error: 'Failed to get coaching response',
            errorHi: 'कोचिंग प्रतिक्रिया प्राप्त करने में विफल'
        });
    }
});

/**
 * GET /api/coaching/scenarios
 * Get pre-built scenario templates for quick access
 */
router.get('/scenarios', (req, res) => {
    try {
        const { language = 'en' } = req.query;

        const scenarios = Object.entries(SCENARIO_PROMPTS).map(([key, category]) => ({
            id: key,
            title: language === 'hi' ? category.titleHi : category.title,
            prompts: category.prompts.map(prompt => ({
                id: prompt.id,
                text: language === 'hi' ? prompt.textHi : prompt.text
            }))
        }));

        res.json({
            success: true,
            scenarios,
            language
        });
    } catch (error) {
        console.error('Scenarios error:', error);
        res.status(500).json({
            error: 'Failed to get scenarios',
            errorHi: 'परिदृश्य प्राप्त करने में विफल'
        });
    }
});

/**
 * GET /api/coaching/status
 * Check if AI coaching is available
 */
router.get('/status', (req, res) => {
    res.json({
        success: true,
        aiAvailable: isGeminiReady(),
        message: isGeminiReady()
            ? 'AI coaching is ready'
            : 'AI unavailable - using offline responses',
        messageHi: isGeminiReady()
            ? 'AI कोचिंग तैयार है'
            : 'AI अनुपलब्ध - ऑफ़लाइन प्रतिक्रियाएं उपयोग में'
    });
});

export default router;

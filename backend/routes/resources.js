import express from 'express';
import { MICRO_LESSONS } from '../services/prompts.js';

const router = express.Router();

/**
 * GET /api/resources/micro-lessons
 * Get all micro-learning modules
 */
router.get('/micro-lessons', (req, res) => {
    try {
        const { language = 'en', category } = req.query;

        let lessons = MICRO_LESSONS;

        if (category) {
            lessons = lessons.filter(lesson => lesson.category === category);
        }

        const transformedLessons = lessons.map(lesson => ({
            id: lesson.id,
            category: lesson.category,
            title: language === 'hi' ? lesson.titleHi : lesson.title,
            duration: lesson.duration,
            preview: (language === 'hi' ? lesson.contentHi : lesson.content).substring(0, 100) + '...'
        }));

        res.json({
            success: true,
            lessons: transformedLessons,
            total: transformedLessons.length,
            language
        });
    } catch (error) {
        console.error('Micro-lessons error:', error);
        res.status(500).json({
            error: 'Failed to get micro-lessons',
            errorHi: 'माइक्रो-पाठ प्राप्त करने में विफल'
        });
    }
});

/**
 * GET /api/resources/micro-lessons/:id
 * Get a specific micro-lesson by ID
 */
router.get('/micro-lessons/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { language = 'en' } = req.query;

        const lesson = MICRO_LESSONS.find(l => l.id === id);

        if (!lesson) {
            return res.status(404).json({
                error: 'Lesson not found',
                errorHi: 'पाठ नहीं मिला'
            });
        }

        res.json({
            success: true,
            lesson: {
                id: lesson.id,
                category: lesson.category,
                title: language === 'hi' ? lesson.titleHi : lesson.title,
                duration: lesson.duration,
                content: language === 'hi' ? lesson.contentHi : lesson.content
            },
            language
        });
    } catch (error) {
        console.error('Micro-lesson detail error:', error);
        res.status(500).json({
            error: 'Failed to get lesson',
            errorHi: 'पाठ प्राप्त करने में विफल'
        });
    }
});

/**
 * GET /api/resources/categories
 * Get list of resource categories
 */
router.get('/categories', (req, res) => {
    const { language = 'en' } = req.query;

    const categories = [
        {
            id: 'classroom_management',
            name: language === 'hi' ? 'कक्षा प्रबंधन' : 'Classroom Management',
            icon: '👥'
        },
        {
            id: 'pedagogy_math',
            name: language === 'hi' ? 'गणित शिक्षण' : 'Math Teaching',
            icon: '🔢'
        },
        {
            id: 'pedagogy_language',
            name: language === 'hi' ? 'भाषा और पठन' : 'Language & Reading',
            icon: '📖'
        },
        {
            id: 'fln',
            name: language === 'hi' ? 'FLN गतिविधियां' : 'FLN Activities',
            icon: '🎯'
        },
        {
            id: 'assessment',
            name: language === 'hi' ? 'मूल्यांकन' : 'Assessment',
            icon: '📊'
        }
    ];

    res.json({
        success: true,
        categories,
        language
    });
});

export default router;

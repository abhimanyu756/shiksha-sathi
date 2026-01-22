import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeGemini } from './services/gemini.js';
import coachingRoutes from './routes/coaching.js';
import resourcesRoutes from './routes/resources.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Shikshak Saathi API is running',
        messageHi: 'शिक्षक साथी API चल रही है',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/coaching', coachingRoutes);
app.use('/api/resources', resourcesRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize Gemini and start server
async function startServer() {
    const geminiReady = initializeGemini(process.env.GEMINI_API_KEY);

    if (!geminiReady) {
        console.log('⚠️  Running without AI - offline responses will be used');
    }

    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎓 शिक्षक साथी - Shikshak Saathi Server                 ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                  ║
║                                                           ║
║   Server running on: http://localhost:${PORT}              ║
║   AI Status: ${geminiReady ? '✅ Ready' : '⚠️  Offline mode'}                            ║
║                                                           ║
║   Endpoints:                                              ║
║   • GET  /api/health          - Health check              ║
║   • POST /api/coaching/ask    - Get AI coaching           ║
║   • GET  /api/coaching/scenarios - Get scenarios          ║
║   • GET  /api/resources/micro-lessons - Get lessons       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
    });
}

startServer();

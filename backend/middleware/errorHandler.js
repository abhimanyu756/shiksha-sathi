/**
 * Global error handling middleware
 */
export function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation failed',
            errorHi: 'सत्यापन विफल',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            errorHi: 'अनधिकृत'
        });
    }

    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Something went wrong'
            : err.message,
        errorHi: 'कुछ गलत हो गया'
    });
}

/**
 * 404 handler for unknown routes
 */
export function notFoundHandler(req, res) {
    res.status(404).json({
        error: `Route ${req.method} ${req.path} not found`,
        errorHi: 'रास्ता नहीं मिला'
    });
}

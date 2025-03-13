const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { auth } = require('./config/auth');
const apiRoutes = require('./routes/api');
const errorMiddleware = require('./middleware/error');
const securityMiddleware = require('./middleware/security');
const logger = require('./services/logger');

const app = express();

// Middleware
app.use(express.json());
app.use(securityMiddleware);

// Initialize Firebase Auth
auth.initialize();

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        version: '1.0.0',
        endpoints: {
            items: '/api/items',
            documentation: '/api-docs'
        }
    });
});

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorMiddleware);

// Only start the server if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

module.exports = app;
const { auth } = require('../config/auth');
const logger = require('../services/logger');

exports.authMiddleware = async (req, res, next) => {
    try {
        console.log(req.headers)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = await auth.verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        logger.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};

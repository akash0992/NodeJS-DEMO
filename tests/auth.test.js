const { auth } = require('../src/config/auth');
const { authMiddleware } = require('../src/middleware/auth');

describe('Authentication', () => {
    let mockReq;
    let mockRes;
    let nextFunction;

    beforeEach(() => {
        mockReq = {
            headers: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        nextFunction = jest.fn();
    });

    it('should reject requests without token', async () => {
        await authMiddleware(mockReq, mockRes, nextFunction);
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'No token provided' });
    });

    it('should reject invalid tokens', async () => {
        mockReq.headers.authorization = 'Bearer invalid_token';
        await authMiddleware(mockReq, mockRes, nextFunction);
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Authentication failed' });
    });

    it('should accept valid tokens', async () => {
        const token = auth.generateToken('test-user');
        mockReq.headers.authorization = `Bearer ${token}`;
        await authMiddleware(mockReq, mockRes, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
        expect(mockReq.user).toBeDefined();
    });
});

const request = require('supertest');
const app = require('../src/app');
const database = require('../src/services/database');

describe('API Endpoints', () => {
    beforeEach(() => {
        // Clear database before each test
        database.items.clear();
        database.nextId = 1;
    });

    describe('GET /api/items', () => {
        it('should return all items', async () => {
            database.create({ name: 'Test Item' });
            const res = await request(app).get('/api/items');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].name).toBe('Test Item');
        });
    });

    describe('POST /api/items', () => {
        it('should create a new item', async () => {
            const res = await request(app)
                .post('/api/items')
                .set('Authorization', 'Bearer valid_token')
                .send({ name: 'New Item' });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('New Item');
        });

        it('should validate input', async () => {
            const res = await request(app)
                .post('/api/items')
                .set('Authorization', 'Bearer valid_token')
                .send({});
            expect(res.status).toBe(400);
        });
    });

    describe('PUT /api/items/:id', () => {
        it('should update an existing item', async () => {
            const item = database.create({ name: 'Test Item' });
            const res = await request(app)
                .put(`/api/items/${item.id}`)
                .set('Authorization', 'Bearer valid_token')
                .send({ name: 'Updated Item' });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Updated Item');
        });
    });

    describe('DELETE /api/items/:id', () => {
        it('should delete an existing item', async () => {
            const item = database.create({ name: 'Test Item' });
            const res = await request(app)
                .delete(`/api/items/${item.id}`)
                .set('Authorization', 'Bearer valid_token');
            expect(res.status).toBe(204);
        });
    });
});

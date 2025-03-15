const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');
const { auth } = require('../src/config/auth');

describe('API Endpoints', () => {
    let token;

    beforeAll(async () => {
        // Verify we're using test database
        const dbConfig = await pool.query('SELECT current_database()');
        if (dbConfig.rows[0].current_database !== 'todos_test') {
            throw new Error('Tests must be run on test database');
        }

        // Clean test database
        await pool.query('TRUNCATE todos RESTART IDENTITY CASCADE');
        token = auth.generateToken('test-user');
    });

    afterEach(async () => {
        // Clean up after each test
        await pool.query('TRUNCATE todos RESTART IDENTITY CASCADE');
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('GET /api/todos', () => {
        it('should return all todos', async () => {
            await pool.query("INSERT INTO todos (name) VALUES ('Test Todo')");
            const res = await request(app).get('/api/todos');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].name).toBe('Test Todo');
        });
    });

    describe('POST /api/todos', () => {
        it('should create a new todo', async () => {
            const res = await request(app)
                .post('/api/todos')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'New Todo' });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('New Todo');
        });

        it('should validate input', async () => {
            const res = await request(app)
                .post('/api/todos')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect(res.status).toBe(400);
        });
    });

    describe('PUT /api/todos/:id', () => {
        it('should update an existing todo', async () => {
            const todo = await pool.query("INSERT INTO todos (name) VALUES ('Test Todo') RETURNING *");
            const res = await request(app)
                .put(`/api/todos/${todo.rows[0].id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Updated Todo' });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Updated Todo');
        });
    });

    describe('DELETE /api/todos/:id', () => {
        it('should delete an existing todo', async () => {
            const todo = await pool.query("INSERT INTO todos (name) VALUES ('Test Todo') RETURNING *");
            const res = await request(app)
                .delete(`/api/todos/${todo.rows[0].id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(204);
        });
    });
});

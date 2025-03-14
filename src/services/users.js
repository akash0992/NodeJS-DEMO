const pool = require('../config/database');
const bcrypt = require('bcrypt');
const logger = require('./logger');

class UsersService {
    async createUser(username, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = `
                INSERT INTO users (username, email, password_hash) 
                VALUES ($1, $2, $3) 
                RETURNING id, username, email, created_at`;
            const result = await pool.query(query, [username, email, hashedPassword]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating user:', error);
            throw error;
        }
    }

    async findByUsername(username) {
        try {
            const query = 'SELECT * FROM users WHERE username = $1';
            const result = await pool.query(query, [username]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error finding user:', error);
            throw error;
        }
    }

    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new UsersService();

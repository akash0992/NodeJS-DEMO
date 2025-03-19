
const config = {
    serverPort: process.env.PORT || 5000,
    dbUser: process.env.DB_USER || 'mudit',
    database: process.env.DB_NAME || "testdb",
    dbPassword: process.env.DB_PASSWORD || "mudit1234",
    dbPort: process.env.DB_PORT ||  5432,
    max: process.env.POOLSIZE || 10, // Pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

export default config;
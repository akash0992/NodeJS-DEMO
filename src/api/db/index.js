import pkg from 'pg';
const { Pool } = pkg;
import util from "util";
import config from '../../../config/index.js';

const sql_pool = new Pool({
  user: config.dbUser,
  database: config.database,
  password: config.dbPassword,
  port: config.dbPort,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis,
  connectionTimeoutMillis: config.connectionTimeoutMillis,
});

const pool = {
  query: (sql, args) => {
    return util.promisify(sql_pool.query).call(sql_pool, sql, args);
  },
};

export default pool;

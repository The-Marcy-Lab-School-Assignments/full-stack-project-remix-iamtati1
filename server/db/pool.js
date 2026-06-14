const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.DATABASE_URL;

const pool = isProduction
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
  : new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
  });

module.exports = pool;

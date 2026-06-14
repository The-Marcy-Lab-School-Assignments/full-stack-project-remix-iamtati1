const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = isProduction
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  : new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
  });

module.exports = pool;

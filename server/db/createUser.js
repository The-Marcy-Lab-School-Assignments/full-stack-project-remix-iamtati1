import bcrypt from "bcrypt";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_Qy9pjkzBOU4d@ep-wispy-mouse-ajr82d66-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    ssl: {
        rejectUnauthorized: false,
    },
});
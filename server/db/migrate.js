const pool = require('./pool');

const migrate = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      task_id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      due_date TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      is_complete BOOLEAN DEFAULT FALSE,
      priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activity_log (
      log_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE,
      action TEXT CHECK (action IN ('TASK_CREATED','TASK_UPDATED','TASK_COMPLETED','TASK_DELETED')) NOT NULL,
      meta JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log('Database migration complete.');
};

module.exports = migrate;

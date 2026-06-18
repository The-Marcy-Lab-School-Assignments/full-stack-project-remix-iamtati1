require('dotenv').config();

const express = require('express');
const migrate = require('./db/migrate');
const cookieSession = require('cookie-session');
const pool = require("./db/pool");
const app = express();

const path = require('path');



const logRoutes = require('./middleware/logRoutes');
const authControllers = require('./controllers/authControllers')
const taskRoutes = require("./routes/taskRoutes");
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// Render (and most cloud providers) sit behind a reverse proxy.
// This lets Express see the real protocol (https) so secure cookies work.
app.set('trust proxy', 1);

// ====================================
// Middleware
// ====================================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: [process.env.SESSION_SECRET || 'dev-fallback-secret'],
  maxAge: 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
}));

app.use(logRoutes);


// ====================================
// Auth routes
// ====================================


app.post('/api/auth/register', authControllers.register);
app.post('/api/auth/login', authControllers.login);
app.get('/api/auth/me', authControllers.getMe);
app.delete('/api/auth/logout', authControllers.logout);

// ====================================
// Task Routes
// ====================================
app.use("/api/tasks", taskRoutes);

// ====================================
// DB Check (debug route)
// ====================================
app.get("/db-check", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(result.rows);
});

// ====================================
// Serve frontend (MUST be after API routes)
// ====================================
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ====================================
// Global Error Handler (MUST be last)
// ====================================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ====================================
// Listen (ALWAYS LAST)
// ====================================
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await migrate();
  } catch (err) {
    console.error('Migration failed (tables may already exist or DB not ready):', err.message);
  }
});
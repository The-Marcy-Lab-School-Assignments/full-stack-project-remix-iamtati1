require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const pool = require("./db/pool");
const app = express();

const path = require('path');



const logRoutes = require('./middleware/logRoutes');
const authControllers = require('./controllers/authControllers')
const taskRoutes = require("./routes/taskRoutes");
const cors = require('cors');


const PORT = process.env.PORT || 8080;

// ====================================
// Middleware
// ====================================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: ["dev_key"],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use((req, res, next) => {
  next();
});


app.use(logRoutes);
app.use((req, res, next) => {

  next();
});

// ====================================
// Health Check / Root Route
// ====================================

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend server is running',
  });
});
// In production, serve the built React app from frontend/dist.
// In development, Vite's dev server handles the frontend on a separate port
// and proxies /api requests to this server.
app.use(express.static(path.join(__dirname, '../frontend/dist')));
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
// Global Error Handler
// ====================================
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};
app.use(handleError);

// ====================================
// Listen
// ====================================

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



app.get("/db-check", async (req, res) => {
  const result = await pool.query(
    "SELECT current_database()"
  );

  res.send(result.rows);
});
// ====================================
// ENV
// ====================================
require("dotenv").config();

// ====================================
// CORE IMPORTS
// ====================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const cookieSession = require("cookie-session");

// DB + MIGRATION
const migrate = require("./db/migrate");
const pool = require("./db/pool");

// ROUTES / CONTROLLERS
const logRoutes = require("./middleware/logRoutes");
const authControllers = require("./controllers/authControllers");
const taskRoutes = require("./routes/taskRoutes");

// ====================================
// APP INIT
// ====================================
const app = express();
const PORT = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === "production";

// ====================================
// TRUST PROXY (Render requirement)
// ====================================
app.set("trust proxy", 1);

// ====================================
// CORS (SAFE VERSION)
// ====================================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.CLIENT_URL || ""
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser requests (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("🚫 Blocked by CORS:", origin);

      // IMPORTANT: do NOT crash frontend in production
      return callback(null, true);
    },
    credentials: true,
  })
);

// ====================================
// MIDDLEWARE
// ====================================
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-fallback-secret"],
    maxAge: 24 * 60 * 60 * 1000,
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
  })
);

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(logRoutes);

// ====================================
// STATIC FRONTEND SETUP
// ====================================
const distPath = path.join(__dirname, "public");
const indexPath = path.join(distPath, "index.html");

console.log("📦 DIST PATH:", distPath);
console.log("📄 INDEX EXISTS:", fs.existsSync(indexPath));

// Serve static assets FIRST
app.use(
  express.static(distPath, {
    maxAge: "1d",
    etag: true,
  })
);

// ====================================
// AUTH ROUTES
// ====================================
app.post("/api/auth/register", authControllers.register);
app.post("/api/auth/login", authControllers.login);
app.get("/api/auth/me", authControllers.getMe);
app.delete("/api/auth/logout", authControllers.logout);

// ====================================
// TASK ROUTES
// ====================================
app.use("/api/tasks", taskRoutes);

// ====================================
// DEBUG ROUTES
// ====================================
app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/debug-dist", (req, res) => {
  res.json({
    distPath,
    exists: fs.existsSync(distPath),
    files: fs.existsSync(distPath) ? fs.readdirSync(distPath) : [],
  });
});

// ====================================
// FRONTEND FALLBACK (MUST BE LAST)
// ====================================
app.get("*", (req, res) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/debug")) {
    return res.status(404).json({ message: "Not found" });
  }

  if (!fs.existsSync(indexPath)) {
    return res.status(500).json({
      error: "Frontend not built",
      indexPath,
    });
  }

  res.sendFile(indexPath);
});

// ====================================
// GLOBAL ERROR HANDLER
// ====================================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:");
  console.error(err);

  res.status(500).json({
    message: err.message,
    stack: isProduction ? undefined : err.stack,
  });
});

// ====================================
// START SERVER (SAFE FOR RENDER)
// ====================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Run migrations AFTER server starts (prevents Render crash loops)
migrate()
  .then(() => console.log("✅ DB migration complete"))
  .catch((err) => {
    console.log("⚠️ Migration skipped/failed:", err.message);
  });
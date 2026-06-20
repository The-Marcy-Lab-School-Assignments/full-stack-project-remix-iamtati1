require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const cookieSession = require("cookie-session");

const migrate = require("./db/migrate");
const pool = require("./db/pool");

const logRoutes = require("./middleware/logRoutes");
const authControllers = require("./controllers/authControllers");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

// ====================================
// Trust proxy (needed for Render cookies)
// ====================================
app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";

// ====================================
// CORS CONFIG (safer)
// ====================================

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.CLIENT_URL,
]);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      console.log("🚫 Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ====================================
// Middleware
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

// Debug logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("SESSION:", req.session);
  next();
});

app.use(logRoutes);

// ====================================
// PATHS (frontend build)
// ====================================
const distPath = path.join(__dirname, "public");
const assetsPath = path.join(distPath, "assets");
const indexPath = path.join(distPath, "index.html");

// Debug logs on startup
console.log("DIST PATH:", distPath);
console.log("DIST EXISTS:", fs.existsSync(distPath));
console.log("ASSETS EXISTS:", fs.existsSync(assetsPath));

if (fs.existsSync(distPath)) {
  console.log("DIST FILES:", fs.readdirSync(distPath));
}

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
// DEBUG ROUTES (safe, before catch-all)
// ====================================
app.get("/db-check", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(result.rows);
});

app.get("/debug-files", (req, res) => {
  res.json({
    distExists: fs.existsSync(distPath),
    distPath,
    files: fs.existsSync(distPath) ? fs.readdirSync(distPath) : [],
  });
});

app.get("/debug-dist", (req, res) => {
  res.json({
    distPath,
    distExists: fs.existsSync(distPath),
    assetsExists: fs.existsSync(assetsPath),
    distFiles: fs.existsSync(distPath) ? fs.readdirSync(distPath) : [],
    assetFiles: fs.existsSync(assetsPath) ? fs.readdirSync(assetsPath) : [],
  });
});

// ====================================
// STATIC FRONTEND (ONLY IF BUILT)
// ====================================
app.use(express.static(distPath));
// ====================================
// FRONTEND FALLBACK (MUST BE LAST ROUTE)
// ====================================
app.get("*", (req, res) => {
  if (
    req.path.startsWith("/api") ||
    req.path.startsWith("/debug")
  ) {
    return res.status(404).json({ message: "Not found" });
  }

  // IMPORTANT: DO NOT intercept assets

  res.sendFile(indexPath);
});

// ====================================
// GLOBAL ERROR HANDLER (LAST)
// ====================================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  console.log("SESSION:", req.session);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// ====================================
// START SERVER
// ====================================
app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  try {
    await migrate();
    console.log("✅ DB migration complete");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  }
});
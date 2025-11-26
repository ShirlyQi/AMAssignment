// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()


app.use(cors({
  origin: "http://localhost:5173", // Vue开发服务器地址
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", require("./routes/auth"))
app.use("/api", require("./routes/admin"))

app.get("/api/test-db", async (req, res) => {
  try {
    const db = require("./config/db")
    const [result] = await db.query("SELECT 1 + 1 AS result")
    res.json({ 
      success: true, 
      message: "Database connection successful",
      result: result[0].result
    })
  } catch (error) {
    console.error("Database test error:", error)
    res.status(500).json({ 
      success: false, 
      message: "Database connection failed",
      error: error.message 
    })
  }
})


app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Visit Malaysia 2026 API",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  })
})


app.get("/", (req, res) => {
  res.json({
    message: "Visit Malaysia 2026 Backend API",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me",
        forgotPassword: "POST /api/auth/forgot-password"
      },
      health: "GET /api/health",
      test: "GET /api/test-db"
    },
    documentation: "Check API docs for more details"
  })
})


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})


app.use((err, req, res, next) => {
  console.error("Server Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  })

 
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    })
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
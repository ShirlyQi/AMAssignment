// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

// 中间件配置
app.use(cors({
  origin: "http://localhost:5173", // Vue开发服务器地址
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.use("/api/auth", require("./routes/auth"))

// 测试数据库连接
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

// 健康检查
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Visit Malaysia 2026 API",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  })
})

// 主页
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

// 404处理
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error("Server Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  })

  // JWT认证错误
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

  // 通用错误响应
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
})

// 启动服务器
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || "localhost"

app.listen(PORT, HOST, () => {
  console.log("\n" + "=".repeat(50))
  console.log("🚀 Visit Malaysia 2026 Backend Server")
  console.log("=".repeat(50))
  console.log(`✅ Server running on: http://${HOST}:${PORT}`)
  console.log("\n📡 Available Endpoints:")
  console.log(`   🔗 Home: http://${HOST}:${PORT}/`)
  console.log(`   📊 Health: http://${HOST}:${PORT}/api/health`)
  console.log(`   🗄️  DB Test: http://${HOST}:${PORT}/api/test-db`)
  console.log(`   🔐 Register: http://${HOST}:${PORT}/api/auth/register`)
  console.log(`   🔑 Login: http://${HOST}:${PORT}/api/auth/login`)
  console.log("\n" + "=".repeat(50))
})
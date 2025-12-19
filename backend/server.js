// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

// 中间件
app.use(cors())
app.use(express.json())

// 路由
app.use("/api/auth", require("./routes/auth"))

// 测试接口
app.get("/", (req, res) => {
  res.send("Backend running")
})

// 启动
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

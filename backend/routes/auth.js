// backend/routes/auth.js
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

// 假数据库
// 密码都是 bcrypt hash('123456')
const users = [
  {
    email: "test@example.com",
    password: "$2a$10$FqOZq8e2pELkKq0hZ3u1zOWcBDJqE9VY9LqD7lC0hKJ5HkY7CeM5K"
  }
]

// 登录接口
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(400).json({ message: "User not found" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" })
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.json({
    token,
    user: { email: user.email }
  })
})

module.exports = router

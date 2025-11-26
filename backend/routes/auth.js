const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../config/db")
const router = express.Router()


const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}


router.post("/register", async (req, res) => {
  const { name, email, password, phone, address } = req.body

  try {

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      })
    }

    
    const [existingUsers] = await db.query(
      "SELECT email FROM Member WHERE email = ?",
      [email]
    )

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

 
    const [result] = await db.query(
      `INSERT INTO Member 
       (name, email, password, phone, address, join_date, expiry_date, is_active) 
       VALUES (?, ?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), 1)`,
      [name, email, hashedPassword, phone || null, address || null]
    )

    
    const token = jwt.sign(
      {
        member_id: result.insertId,
        email: email,
        name: name
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Visit Malaysia 2026!",
      token,
      user: {
        member_id: result.insertId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        join_date: new Date().toISOString().split('T')[0]
      }
    })

  } catch (err) {
    console.error("Registration error:", err)

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      })
    }

    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again later."
    })
  }
})


router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

  
    const [rows] = await db.query(
      `SELECT member_id, name, email, password, phone, address, 
              join_date, expiry_date, is_active 
       FROM Member 
       WHERE email = ?`,
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    const user = rows[0]

   
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact support."
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign(
      {
        member_id: user.member_id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    
    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      message: "Login successful! Welcome back!",
      token,
      user: userWithoutPassword
    })

  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again later."
    })
  }
})


router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const [rows] = await db.query(
      `SELECT member_id, name, email, phone, address, 
              join_date, expiry_date, is_active
       FROM Member 
       WHERE member_id = ?`,
      [decoded.member_id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      user: rows[0]
    })

  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      })
    }

    console.error("Get user error:", err)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user information"
    })
  }
})


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    
    const [rows] = await db.query(
      "SELECT member_id, email, name FROM Member WHERE email = ?",
      [email]
    )

    if (rows.length === 0) {
   
      return res.json({
        success: true,
        message: "If your email is registered, you will receive password reset instructions."
      })
    }

    res.json({
      success: true,
      message: "Password reset instructions have been sent to your email."
    })

  } catch (err) {
    console.error("Forgot password error:", err)
    res.status(500).json({
      success: false,
      message: "Failed to process password reset request"
    })
  }
})


router.post("/validate-token", (req, res) => {
  const { token } = req.body

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    res.json({
      success: true,
      valid: true,
      decoded
    })

  } catch (err) {
    res.json({
      success: true,
      valid: false,
      message: err.message
    })
  }
})

module.exports = router
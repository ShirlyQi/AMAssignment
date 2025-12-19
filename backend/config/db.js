const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Jkarry@0921",         
  database: "visitMalaysia2026",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// testConnection
db.getConnection()
  .then(connection => {
    console.log("✅ MySQL connected successfully")
    connection.release()
  })
  .catch(err => {
    console.error("❌ MySQL connection error:", err.message)
  })

module.exports = db
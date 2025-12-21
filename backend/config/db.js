const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  port: 3306,
  user: "sql12812555",
  password: "DnBa3PQmWH",         
  database: "sql12812555",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
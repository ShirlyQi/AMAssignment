const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host: "localhost:3306",
  user: "root",
  password: "Jkarry@0921",         
  database: "visitMalaysia2026",
  waitForConnections: true,
  connectionLimit: 10
})

module.exports = db

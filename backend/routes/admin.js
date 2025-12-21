const express = require("express")
const router = express.Router()
const db = require("../config/db")

/* ==========================
   HELPER
========================== */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ==========================
   MEMBERS
========================== */
// GET all members
router.get("/members", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Member
  `)
  res.json(rows)
}))

// CREATE member (admin)
router.post("/members", asyncHandler(async (req, res) => {
  const { name, email, phone, address, membership_expiry_date, preferred } = req.body

  console.log('preferred:', preferred)

  const [result] = await db.query(
    `INSERT INTO Member (name, email, phone, address, membership_expiry_date, preferred)
     VALUES (?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 1 YEAR), ?)`,
    [name, email, phone, address, preferred]
  )

  res.status(201).json({
    id: result.insertId,
    name,
    email,
    phone,
    address,
    preferred
  })
}))

// DELETE member
router.delete("/members/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Member WHERE member_id = ?", [req.params.id])
  res.json({ success: true })
}))

/* ==========================
   EMPLOYEES
========================== */
router.get("/employees", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Employee
  `)
  res.json(rows)
}))

router.post("/employees", asyncHandler(async (req, res) => {
  const { name, email, phone, location } = req.body

  const [result] = await db.query(
    `INSERT INTO Employee (name, email, phone, location, completed_reservations)
     VALUES (?, ?, ?, ?, 0)`,
    [name, email, phone, location]
  )

  res.status(201).json({ id: result.insertId, ...req.body })
}))

router.delete("/employees/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Employee WHERE employee_id = ?", [req.params.id])
  res.json({ success: true })
}))

/* ==========================
   ATTRACTIONS
========================== */
router.get("/attractions", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Attraction
  `)
  res.json(rows)
}))

router.post("/attractions", asyncHandler(async (req, res) => {
  const { name, description, type, entry_fee, location, city } = req.body

  const [result] = await db.query(
    `INSERT INTO Attraction (name, description, type, entry_fee, location, city)
     VALUES (?, ?, ?, ?, ?,?)`,
    [name, description, type, entry_fee, location, city]
  )

  res.status(201).json({ id: result.insertId, ...req.body })
}))

router.delete("/attractions/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Attraction WHERE attraction_id = ?", [req.params.id])
  res.json({ success: true })
}))

/* ==========================
   LOCATIONS
========================== */
router.get("/locations", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Location
  `)
  res.json(rows)
}))

router.post("/locations", asyncHandler(async (req, res) => {
  const { state, country, person_in_charge } = req.body

  const [result] = await db.query(
    `INSERT INTO Location (state, country, person_in_charge)
     VALUES (?, ?, ?)`,
    [state, country, person_in_charge]
  )

  res.status(201).json({ id: result.insertId, ...req.body })
}))

router.delete("/locations/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Location WHERE location_id = ?", [req.params.id])
  res.json({ success: true })
}))

/* ==========================
   RESERVATIONS
========================== */
router.get("/reservations", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Reservation
  `)
  res.json(rows)
}))

router.post("/reservations", asyncHandler(async (req, res) => {
  const { member, attraction, employee, reservation_date, reservation_time, number_of_visitors, entry_fee, total_cost } = req.body

  const [result] = await db.query(
    `INSERT INTO Reservation (member, attraction, employee, reservation_date, reservation_time, number_of_visitors, entry_fee, total_cost)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [member, attraction, employee, reservation_date, reservation_time, number_of_visitors, entry_fee, total_cost]
  )

  res.status(201).json({ id: result.insertId, ...req.body })
}))

router.delete("/reservations/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Reservation WHERE reservation_id = ?", [req.params.id])
  res.json({ success: true })
}))

/* ==========================
   REPORTS
========================== */
router.get("/reports", asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Report
  `)
  res.json(rows)
}))

router.post("/reports", asyncHandler(async (req, res) => {
  const { name, type, by, date } = req.body

  const [result] = await db.query(
    `INSERT INTO Report (name, type, generated_by, date)
     VALUES (?, ?, ?, ?)`,
    [name, type, by, date]
  )

  res.status(201).json({ id: result.insertId, name, type, by, date })
}))

router.delete("/reports/:id", asyncHandler(async (req, res) => {
  await db.query("DELETE FROM Report WHERE report_id = ?", [req.params.id])
  res.json({ success: true })
}))


router.post("/assign-employee", async (req, res) => {
  const { attractionName } = req.body

  if (!attractionName) {
    return res.status(400).json({ message: "Attraction name is required" })
  }

  try {
    // 1️⃣ Find attraction location
    const [attractions] = await db.query(
      `SELECT name, location FROM Attraction WHERE name = ?`,
      [attractionName]
    )

    if (attractions.length === 0) {
      return res.status(404).json({ message: "Attraction not found" })
    }

    const attraction = attractions[0]
    const location = attraction.location

    // 2️⃣ Find employee responsible for that location
    const [employees] = await db.query(
      `
      SELECT name, email, phone, location
      FROM Employee
      WHERE FIND_IN_SET(?, location)
      `,
      [location]
    )

    return res.json({
      attraction: attraction.name,
      location,
      employees
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

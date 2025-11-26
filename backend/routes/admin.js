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

// 1. members-summary
router.get("/reports/members-summary", asyncHandler(async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) as total_members,
        DATE_FORMAT(MIN(membership_expiry_date), '%Y-%m-%d') as earliest_expiry,
        DATE_FORMAT(MAX(membership_expiry_date), '%Y-%m-%d') as latest_expiry,
        COUNT(CASE WHEN preferred IS NOT NULL AND preferred != '' THEN 1 END) as members_with_preferences,
        COUNT(CASE WHEN membership_expiry_date < CURDATE() THEN 1 END) as expired_members
      FROM Member
    `)
    res.json({
      success: true,
      data: rows[0]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 2. reservations-by-employee
router.get("/reports/reservations-by-employee", asyncHandler(async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.name as employee_name,
        e.email as employee_email,
        e.location,
        COUNT(r.reservation_id) as total_reservations,
        SUM(r.number_of_visitors) as total_visitors_handled,
        SUM(r.total_cost) as total_revenue_handled
      FROM Employee e
      LEFT JOIN Reservation r ON e.name = r.employee
      GROUP BY e.employee_id, e.name, e.email, e.location
      ORDER BY total_reservations DESC
    `)
    res.json({
      success: true,
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 3. monthly-report
router.get("/reports/monthly-report", asyncHandler(async (req, res) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query
    
    const [rows] = await db.query(`
      SELECT 
        a.name as attraction_name,
        a.type,
        a.city,
        a.entry_fee,
        COUNT(r.reservation_id) as reservation_count,
        COALESCE(SUM(r.number_of_visitors), 0) as total_visitors,
        COALESCE(SUM(r.total_cost), 0) as total_revenue
      FROM Attraction a
      LEFT JOIN Reservation r ON a.name = r.attraction
        AND MONTH(r.reservation_date) = ?
        AND YEAR(r.reservation_date) = ?
      GROUP BY a.attraction_id, a.name, a.type, a.city, a.entry_fee
      ORDER BY reservation_count DESC, total_revenue DESC
    `, [month, year])
    
    res.json({
      success: true,
      period: `${year}-${String(month).padStart(2, '0')}`,
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 4. members-alphabetical
router.get("/reports/members-alphabetical", asyncHandler(async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        member_id,
        name,
        email,
        phone,
        address,
        preferred,
        DATE_FORMAT(membership_expiry_date, '%Y-%m-%d') as membership_expiry_date,
        CASE 
          WHEN membership_expiry_date < CURDATE() THEN 'Expired'
          WHEN membership_expiry_date < DATE_ADD(CURDATE(), INTERVAL 30 DAY) THEN 'Expiring Soon'
          ELSE 'Active'
        END as membership_status
      FROM Member
      ORDER BY 
        SUBSTRING_INDEX(name, ' ', -1) ASC,
        name ASC
    `)
    res.json({
      success: true,
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 5. attractions-by-filter
router.get("/reports/attractions-by-filter", asyncHandler(async (req, res) => {
  try {
    const { city, type } = req.query
    let query = `
      SELECT 
        a.attraction_id,
        a.name,
        a.description,
        a.type,
        a.entry_fee,
        a.location,
        a.city,
        COUNT(r.reservation_id) as total_reservations
      FROM Attraction a
      LEFT JOIN Reservation r ON a.name = r.attraction
      WHERE 1=1
    `
    const params = []
    
    if (city && city !== '') {
      query += " AND a.city = ?"
      params.push(city)
    }
    
    if (type && type !== '') {
      query += " AND a.type = ?"
      params.push(type)
    }
    
    query += " GROUP BY a.attraction_id"
    query += " ORDER BY a.name ASC"
    
    console.log('Executing query:', query)
    console.log('With params:', params)
    
    const [rows] = await db.query(query, params)
    
    res.json({
      success: true,
      filters: { city, type },
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error('Error in attractions-by-filter:', error)
    res.status(500).json({ 
      success: false, 
      error: error.message,
      sqlMessage: error.sqlMessage 
    })
  }
}))

// 6. reservations-by-date-range
router.get("/reports/reservations-by-date-range", asyncHandler(async (req, res) => {
  try {
    const { start_date, end_date } = req.query
    
    // If no date is provided, use the last 30 days.
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);
    
    const queryStartDate = start_date || defaultStartDate.toISOString().split('T')[0]
    const queryEndDate = end_date || new Date().toISOString().split('T')[0]
    
    const [rows] = await db.query(`
      SELECT 
        r.reservation_id,
        r.member,
        r.attraction,
        r.employee,
        r.reservation_date,
        r.reservation_time,
        r.number_of_visitors,
        r.entry_fee,
        r.total_cost,
        m.email as member_email,
        m.phone as member_phone,
        a.type as attraction_type,
        a.city as attraction_city
      FROM Reservation r
      LEFT JOIN Member m ON r.member = m.name
      LEFT JOIN Attraction a ON r.attraction = a.name
      WHERE r.reservation_date BETWEEN ? AND ?
      ORDER BY r.reservation_date DESC, r.reservation_time DESC
    `, [queryStartDate, queryEndDate])
    
    res.json({
      success: true,
      period: `${queryStartDate} to ${queryEndDate}`,
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 7. top-attractions
router.get("/reports/top-attractions", asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    
    const [rows] = await db.query(`
      SELECT 
        a.name as attraction_name,
        a.type,
        a.location,
        a.city,
        a.entry_fee,
        COUNT(r.reservation_id) as reservation_count,
        COALESCE(SUM(r.number_of_visitors), 0) as total_visitors,
        COALESCE(SUM(r.total_cost), 0) as total_revenue,
        COALESCE(AVG(r.number_of_visitors), 0) as average_visitors_per_reservation
      FROM Attraction a
      LEFT JOIN Reservation r ON a.name = r.attraction
      GROUP BY a.attraction_id, a.name, a.type, a.location, a.city, a.entry_fee
      ORDER BY reservation_count DESC, total_revenue DESC
      LIMIT ?
    `, [limit])
    
    res.json({
      success: true,
      limit: limit,
      data: rows,
      count: rows.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))

// 8. revenue-report
router.get("/reports/revenue-report", asyncHandler(async (req, res) => {
  try {
    const { start_date, end_date } = req.query
    
    let whereClause = ""
    const params = []
    
    if (start_date && end_date) {
      whereClause = "WHERE reservation_date BETWEEN ? AND ?"
      params.push(start_date, end_date)
    }
    
    const [monthlyData] = await db.query(`
      SELECT 
        DATE_FORMAT(reservation_date, '%Y-%m') as month,
        COUNT(*) as total_reservations,
        SUM(number_of_visitors) as total_visitors,
        SUM(total_cost) as total_revenue,
        AVG(total_cost) as average_revenue_per_reservation
      FROM Reservation
      ${whereClause}
      GROUP BY DATE_FORMAT(reservation_date, '%Y-%m')
      ORDER BY month DESC
    `, params)
    
    // Calculate the total
    const [totals] = await db.query(`
      SELECT 
        COUNT(*) as total_reservations,
        SUM(number_of_visitors) as total_visitors,
        SUM(total_cost) as total_revenue
      FROM Reservation
      ${whereClause}
    `, params)
    
    res.json({
      success: true,
      period: start_date && end_date ? `${start_date} to ${end_date}` : 'All Time',
      monthly_data: monthlyData,
      totals: totals[0],
      count: monthlyData.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))


router.get("/reports/history", asyncHandler(async (req, res) => {
  try {
  
    res.json({
      success: true,
      data: [],
      message: "Report history is not stored in database. Reports are generated dynamically."
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}))


router.get("/reports", asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Reports are generated dynamically. Use /reports/[report-name] endpoints.",
    available_reports: [
      "/reports/members-summary",
      "/reports/reservations-by-employee",
      "/reports/monthly-report",
      "/reports/members-alphabetical",
      "/reports/attractions-by-filter",
      "/reports/reservations-by-date-range",
      "/reports/top-attractions",
      "/reports/revenue-report"
    ]
  })
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
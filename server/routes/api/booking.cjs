const express = require("express");
const { db } = require("../../db.cjs");

const router = express.Router();

router.post("/", (req, res) =>
{
  const { tenant_id, availability_id, booked_date } = req.body;

  if (!tenant_id || !availability_id || !booked_date)
  {
    return res.status(400).json({ error: "Missing fields" });
  }

  try
  {
    db.prepare(
      `INSERT INTO bookings (tenant_id, availability_id, booked_date)
       VALUES (?, ?, ?)`
    ).run(tenant_id, availability_id, booked_date);

    res.send({ success: true });
  }
  catch (err)
  {
    if (err.code === 'SQLITE_CONSTRAINT')
    {
      return res.status(400).json({ error: "Already booked for that date" });
    }

    // For other errors logging would be nice
  }
});

// Remove booking
router.delete("/:id", (req, res) =>
{
  const { id } = req.params;

  db.prepare("DELETE FROM bookings WHERE id = ?").run(id);

  res.send({ success: true });
});

// For landlord to see who booked for viewing
router.get("/property/:propertyId", (req, res) =>
{
  const { propertyId } = req.params;

  const data = db
    .prepare(`
      SELECT
        b.id AS booking_id,
        b.tenant_id,
        b.booked_date,
        a.weekday,
        a.start_at,
        a.end_at
      FROM bookings b
      JOIN availability a ON b.availability_id = a.id
      WHERE a.property_id = ?
      ORDER BY b.booked_date, a.start_at
    `)
    .all(propertyId);

  res.json(data);
});

router.get("/tenant/:tenantId", (req, res) =>
{
  const { tenantId } = req.params;

  const data = db
    .prepare(`
      SELECT
        b.id AS booking_id,
        b.booked_date,
        a.weekday,
        a.start_at,
        a.end_at,
        a.property_id
      FROM bookings b
      JOIN availability a ON b.availability_id = a.id
      WHERE b.tenant_id = ?
      ORDER BY b.booked_date, a.start_at
    `)
    .all(tenantId);

  res.json(data);
});


module.exports = router;

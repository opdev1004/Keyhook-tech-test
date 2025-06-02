const express = require("express");
const { db } = require("../../db.cjs");

const router = express.Router();

router.post("/", (req, res) =>
{
  const { manager_id, weekday, start_at, end_at, property_id } = req.body;

  if (!manager_id || !weekday || !start_at || !end_at || !property_id)
  {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.prepare(
    `INSERT INTO availability (manager_id, weekday, start_at, end_at, property_id) VALUES (?, ?, ?, ?, ?)`
  ).run(manager_id, weekday, start_at, end_at, property_id);

  res.send({ success: true });
});

// To view all availabilities for test
router.get("/", (_, res) =>
{
  const data = db.prepare("SELECT * FROM availability").all();

  res.json(data);
});


// To delete availability
router.delete("/:id", (req, res) =>
{
  const { id } = req.params;
  // Removes booking when it is not available :)
  db.prepare("DELETE FROM bookings WHERE availability_id = ?").run(id);

  const result = db.prepare("DELETE FROM availability WHERE id = ?").run(id);

  if (result.changes === 0)
  {
    return res.status(404).json({ error: "Schedule not found" });
  }

  res.json({ success: true });
});


// To check availability of property
router.get("/property/:id", (req, res) =>
{
  const data = db
    .prepare("SELECT * FROM availability WHERE property_id = ?")
    .all(req.params.id);
  res.json(data);
});


module.exports = router;

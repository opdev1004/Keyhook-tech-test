const express = require("express");
const { db } = require("../../db.cjs");

const router = express.Router();

router.get("/", (_req, res) =>
{
  const data = db.prepare("SELECT * FROM properties").all();
  res.json(data);
});

module.exports = router;

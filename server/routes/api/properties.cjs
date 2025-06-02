const express = require("express");
const { db } = require("../../db.cjs");

const router = express.Router();

router.get("/", (_, res) =>
{
  const data = db.prepare("SELECT * FROM properties").all();
  res.json(data);
});

router.get("/search", (req, res) =>
{
  const filters = [];
  const params = [];
  const limit = 4;

  // Search keyword handling
  if (req.query.q)
  {
    const keywords = req.query.q
      .split(" ")
      .map(k => k.trim())
      .filter(k => k.length > 0);

    // Handle keywords to be more efficient
    if (keywords.length > 5)
    {
      const hasLongKeywords = keywords.some(k => k.length > 2);
      keywords = hasLongKeywords ? keywords.filter(k => k.length >= 3).slice(0, 5)
        : keywords = keywords.slice(0, 5);
    }


    // search for every cases that matches the keywords
    if (keywords.length > 0)
    {
      const keywordConditions = keywords.map(() => "(name LIKE ? OR address LIKE ?)");
      filters.push(`(${ keywordConditions.join(" OR ") })`);
      for (const keyword of keywords)
      {
        const pattern = `%${ keyword }%`;
        params.push(pattern, pattern);
      }
    }
  }

  // filtering the search
  const fields = ["bedroom", "showerroom", "bathroom", "toiletroom"];

  for (const field of fields)
  {
    const min = req.query[`${ field }_min`];
    const max = req.query[`${ field }_max`];

    if (min)
    {
      filters.push(`${ field } >= ?`);
      params.push(parseInt(min));
    }
    if (max)
    {
      filters.push(`${ field } <= ?`);
      params.push(parseInt(max));
    }
  }

  // For pagination
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const offset = (page - 1) * limit;
  const totalQuery = `SELECT COUNT(*) AS total FROM properties${ filters.length > 0 ? " WHERE " + filters.join(" AND ") : "" }`;
  const total = db.prepare(totalQuery).get(...params).total;
  // Get results
  let resultQuery = "SELECT * FROM properties";

  if (filters.length > 0)
  {
    resultQuery += " WHERE " + filters.join(" AND ");
  }

  resultQuery += " LIMIT ? OFFSET ?";

  const result = db.prepare(resultQuery).all(...params, limit, offset);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    result
  });
});

module.exports = router;

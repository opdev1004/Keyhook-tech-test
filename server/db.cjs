const Database = require("better-sqlite3");
const db = new Database("keyhook.db");

// initialise database schema
db.exec(`
CREATE TABLE IF NOT EXISTS availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  manager_id TEXT NOT NULL,
  weekday TEXT NOT NULL,
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  property_id INTEGER TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  availability_id INTEGER NOT NULL,
  booked_date TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (availability_id) REFERENCES availability(id),
  UNIQUE (availability_id, booked_date)
);

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  manager_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);


// mock property data
const propertyCount = db.prepare("SELECT COUNT(*) AS count FROM properties").get().count;

if (propertyCount === 0)
{
  db.prepare("INSERT INTO properties (name, manager_id) VALUES (?, ?)").run(
    "Test Apartment",
    "landlord1"
  );
  db.prepare("INSERT INTO properties (name, manager_id) VALUES (?, ?)").run(
    "Test House",
    "landlord2"
  );
}


module.exports = {
  db,
};
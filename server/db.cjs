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
  address TEXT NOT NULL,
  bedroom INTEGER NOT NULL,
  showerroom INTEGER NOT NULL,
  bathroom INTEGER NOT NULL,
  toiletroom INTEGER NOT NULL,
  manager_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);


// mock property data
const propertyCount = db.prepare("SELECT COUNT(*) AS count FROM properties").get().count;

if (propertyCount === 0)
{
  const dbStatement = db.prepare("INSERT INTO properties (name, address, bedroom, showerroom, bathroom, toiletroom, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const mockProperties = [
    ["Test Apartment 1", "Wellington City, Wellington", 3, 2, 1, 2, "landlord1"],
    ["Test House 1", "Wellington City, Wellington", 4, 2, 1, 3, "landlord2"],
    ["Test House 2", "Auckland City, Auckland", 5, 2, 2, 3, "landlord1"],
    ["Test Apartment 2", "Johnsonville, Wellington", 2, 1, 1, 1, "landlord2"],
    ["Test House 3", "Johnsonville, Wellington", 3, 1, 1, 2, "landlord3"],
    ["Test House 4", "Lowerhutt, Wellington", 4, 2, 2, 3, "landlord3"],
    ["Test Apartment 3", "Auckland City, Auckland", 2, 1, 1, 1, "landlord4"],
    ["Test House 5", "Lowerhutt, Wellington", 5, 3, 2, 3, "landlord4"],
    ["Test Apartment 4", "Lowerhutt, Wellington", 1, 1, 0, 1, "landlord1"],
    ["Test Apartment 5", "Churton Park, Wellington", 2, 1, 1, 1, "landlord2"],
    ["Test House 6", "Ngaio, Wellington", 3, 2, 1, 2, "landlord3"],
    ["Test House 7", "Newlands, Wellington", 4, 2, 2, 2, "landlord4"],
  ]

  for (const property of mockProperties)
  {
    dbStatement.run(...property);
  }
}


module.exports = {
  db,
};
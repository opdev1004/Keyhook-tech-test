# Tech test 🧗‍♂️

## Description

I have thought about what a property manager would need when they are scheduling availability.
For my first attempt, I designed it to be complicated like using ISO8601 format of time scheduling and possibly using calendar/timetable like component.
However I noticed that the property manager will be make the viewing available every week until they get their tenants or buyer.
So I have designed database scheme and API based on a week.

The feature that I have developed allow the manager to schedule multiple time slot in a day.
Because the property viewing can be done multiple time on same day.

### Backend API && Database Scheme Design

- Property
- Availability
- Booking

```
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
```

Added created_at to track when data is created.

### Frontend Design

- Landlord/Property manager
  - Viewing Manager
    - Components
  - Pages
    - Components
- Tanent
  - Booking Manager
    - Components
  - Pages
    - Components

---

## Running Project

Please run:

```
npm i && npm run dev
```

Commands:

```bash
"dev": "concurrently \"node server/server.cjs\" \"next dev\"",
"build": "next build",
"start": "next start",
"lint": "next lint",
"dev-client": "next dev",
"dev-server": "node server/server.cjs"


npm run dev # for running client and server concurrently
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Server port is 4000, so url is http://localhost:4000

## Frontend

Next.js, React, Tainwind CSS and Typescript

Documentation:

- https://nextjs.org/docs
- https://react.dev/index

## Backend & API

Express.js and common js.

Documentation: https://expressjs.com/en/5x/api.html

## DB

Used SQLite (better-sqlite)

Documentation:

- https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md
- https://www.sqlite.org/lang.html
- https://www.w3schools.com/sql/sql_syntax.asp

## Postman

Used postman to test api
![postman](/mdimage/postman.png).

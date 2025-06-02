# Tech test 🧗‍♂️

## Running Project

### Please run:

```bash
npm i && npm run dev
```

- `npm i` for installing package
- `npm run dev` for running client and server concurrently

or

```bash
npm i && npm run dev-server
```

and run client in the another terminal,

```bash
npm run dev-client
```

### Commands:

```bash
"dev": "concurrently \"node server/server.cjs\" \"next dev\"",
"build": "next build",
"start": "next start",
"lint": "next lint",
"dev-client": "next dev",
"dev-server": "node server/server.cjs"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Server port is 4000, so url is http://localhost:4000

Database file is included in the project for easier reviewing the feature.

It still works after removing the provided database file `keyhook.db`.
But Property ID, Manager ID or Tenant ID needs to be manually typed for adding data.
As this project is created with the assumption that we have login & register system.

Mock property data:

```js
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
];
```

## Description

![Booking Viewing](/mdimage/000.png)
![Booking List](/mdimage/001.png)
![Property Manage Availability Page](/mdimage/002.png)

I have thought about what a property manager would need when they are scheduling availability.
For my first attempt, I designed it to be complicated like using ISO8601 format of time scheduling and possibly using calendar/timetable like component.
However I noticed that the property manager will be make the viewing available every week until they get their tenants or buyer.
So I have designed database scheme and API based on a week.

The feature that I have developed allow the manager to schedule multiple time slot in a day.
Because the property viewing can be done multiple time on same day.

I implemented property search API. So tenants can search the property that they want.
I designed the search API to grab data from properties table that contains the keywords in their name and address.
And if there are many keywords then skip some of them for better result.
However there should be better way than what I have designed.

### Backend API && Database Scheme Design

- Availability
  - post `/api/availability/` for adding availability
  - get `/api/availability/` for adding availability
  - delete `/api/availability/:id` for removing availability
  - get `/api/availability/property/:id` for checking availability of certain property
- Booking
  - post `/api/booking/` for booking
  - delete `/api/booking/:id` for removing booking
  - get `/api/booking/property/:propertyId` for the property manager to see who booked for viewing
  - get `/api/booking/tenant/:tenantId` for the tenant to view his booking
- Property
  - get `/api/properties/` for listing all the properties, for testing and prototyping
  - get `/api/properties/search?` for search and list property for viewing

```sql
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
```

Added created_at to track when data is created.

### Frontend Design

- Landlord/Property manager
  - Viewing Manager
    - Components
  - The other pages
    - Components
- Tanent
  - Booking Manager
    - Components
  - Booking List
    - Components
  - The other pages
    - Components

---

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

I used postman to test API
![postman](/mdimage/postman.png)

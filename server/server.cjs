const express = require("express");
const cors = require("cors");
const availabilityRoutes = require("./routes/api/availability.cjs");
const bookingRoutes = require("./routes/api/booking.cjs");
const propertiesRoutes = require("./routes/api/properties.cjs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/properties", propertiesRoutes);


app.listen(4000, () => console.log("Server running on http://localhost:4000"));

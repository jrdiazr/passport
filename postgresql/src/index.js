const express = require("express");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use(userRoutes);
app.use(driverRoutes);
app.use(vehicleRoutes);

app.listen(3000);
console.log("Server on port 3000");

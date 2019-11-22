const express = require('express');
var cors = require('cors');
const app = express();

//CORS
app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
app.use(userRoutes);
app.use(driverRoutes);
app.use(vehicleRoutes);

app.listen(3000);
console.log('Server on port 3000');

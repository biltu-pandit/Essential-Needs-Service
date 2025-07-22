require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000; // ✅ use const port

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', function (req, res) {
    res.send("This is Home Page....!!!");
});

// controllers
const UserController = require('./controller/UserController');
app.use('/user', UserController);

const AdminController = require('./controller/AdminController');
app.use("/admin", AdminController);

const ServiceController = require('./controller/ServiceController');
app.use("/services", ServiceController);

const ProviderController = require('./controller/ProviderController');
app.use("/provider", ProviderController);

const ContactController = require('./controller/ContactController');
app.use("/contact", ContactController);

const BookedServiceController = require('./controller/BookedServiceController');
app.use("/bookedService", BookedServiceController);

// start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

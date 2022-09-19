const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

// import Routes
const userRoutes = require("./routes/user.routes");

// import error controller
const errorController = require("./controllers/error.controller");

// Setup server port
const port = process.env.PORT || 3000;

// create express app
const app = express();

app.use(cors());
app.use((req, res, next) => {
	res.setHeader("Allow-Control-Allow-Origin", "*");
	res.setHeader("Allow-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Allow-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
	next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route
app.get('/', (req, res) => {
	res.send(`<div style='text-align: center;
	top: 50%;
	position: absolute;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);'>Welcome to <h1>Go With Doctors<h1></div>`);
});


// Actual routing starts from here
app.use('/api/users', userRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

// listen for requests
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
//////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();

//db connection import occurs after dotenv so module can access process.env object with populated key/value pairs
require("./config/database");

const { PORT } = process.env;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//routers
const restaurantRouter = require('./routes/Restaurant')


// create application object
const app = express();

///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// mount express urlencoded - body parser - x-www-urlencoded data (process data from form submission)

app.use(express.urlencoded({ extended: true }));
// mount express JSON body parser
app.use(express.json()); // look for a request 'Content-Type' - 'application/json' -> req.body ({...} or [{...}, {...}])

// handling CROSS ORIGIN RESOURCE requests - prevents errors on our MERN stack
app.use(cors());
// mount cors() -> cross origin request middleware
app.use(morgan("dev"));

// all requests for endpoints that begin with '/restaurant'
app.use("/restaurant", restaurantRouter);

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

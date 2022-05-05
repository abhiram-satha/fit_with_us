//Load .env data into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Web server configuration
const port = 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

//Seperated Routes for Resources
const userRoutes = require("./routes/users");
const weightRoutes = require("./routes/weights")

//Mount all resource routes
app.use("/api/user", userRoutes(db));
app.use("/api/weights", weightRoutes(db))

//Routes
app.get("/", (req, res) => {
  axios
    .get(
      "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc&calories=100-500"
    )
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

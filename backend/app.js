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
const weightRoutes = require("./routes/weights");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

//Mount all resource routes
app.use("/api/user", userRoutes(db));
app.use("/api/weights", weightRoutes(db))
app.use("/api/posts", postRoutes(db))
app.use("/api/comments", commentRoutes(db))



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

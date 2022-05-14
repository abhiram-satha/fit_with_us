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
const emailCheckRoutes = require("./routes/emailCheck");
const usernameCheckRoutes = require("./routes/usernameCheck");
const allUsersRoutes = require("./routes/allUsers");
const weightRoutes = require("./routes/weights");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");
const usersRoutes = require("./routes/users");
const dietary_restrictions = require("./routes/dietary_restrictions");
const user_preferences = require("./routes/user_preferences");
const user_restrictions = require("./routes/user_restrictions");

//Mount all resource routes
app.use("/api/user", userRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/usernameCheck", usernameCheckRoutes(db));
app.use("/api/emailCheck", emailCheckRoutes(db));
app.use("/api/allUsers", allUsersRoutes(db));
app.use("/api/weights", weightRoutes(db));
app.use("/api/posts", postRoutes(db));
app.use("/api/comments", commentRoutes(db));
app.use("/api/dietary_restrictions", dietary_restrictions(db));
app.use("/api/user_preferences", user_preferences(db));
app.use("/api/user_restrictions", user_restrictions(db));


//Routes
// app.get("/", (req, res) => {
//   axios
//     .get(
//       "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc&calories=100-500"
//     )
//     .then((response) => res.send(response.data))
//     .catch((err) => console.log(err));
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

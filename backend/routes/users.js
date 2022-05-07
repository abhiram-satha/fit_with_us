const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const loginInfo = req.query;
    const values = [loginInfo.email, loginInfo.password];
    const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    db.query(query, values)
      .then((data) => {
        const users = data.rows;
        res.send({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const userInfo = req.body;
    const values = [
      userInfo.email,
      userInfo.password,
      userInfo.username,
      userInfo.currentWeight,
      userInfo.goalWeight,
      userInfo.height,
      userInfo.age,
    ];

    const query = `INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender, dietary_restrictions) VALUES ($1, $2, $3, $4, $5, $6, $7, null, null)`;
    db.query(query, values)
      .then((data) => {
        res.send("User added");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

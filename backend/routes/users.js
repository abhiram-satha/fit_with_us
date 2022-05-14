const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const loginInfo = req.query;
    const values = [loginInfo.email];
    const query = `SELECT * FROM users WHERE email = $1`;
    db.query(query, values)
      .then(async (data) => {
        console.log(data.rows);

        if (data.rows.length !== 0) {
          const users = { ...data.rows };
          console.log(loginInfo.password, users[0].password);
          const correctPassword = await bcrypt.compareSync(
            loginInfo.password,
            users[0].password
          );
          console.log(correctPassword);
          console.log(users);

          if (correctPassword) {
            res.send({ users });
          } else {
            users[0].id = "The password is incorrect";
            console.log(users);
            res.send({ users });
          }
        } else {
          const users = { 0: { id: "The email is incorrect" } };
          console.log(users);
          res.send({ users });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", async (req, res) => {
    const userInfo = req.body;
    const hashedPassword = await bcrypt.hashSync(userInfo.password, 10);
    const values = [
      userInfo.email,
      hashedPassword,
      userInfo.username,
      userInfo.currentWeight,
      userInfo.goalWeight,
      userInfo.height,
      2022 - userInfo.age,
      userInfo.gender,
    ];
    const query = `INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    db.query(query, values)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

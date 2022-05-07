const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const loginInfo = req.query;
    const values = [loginInfo.email, loginInfo.username];
    const query = `SELECT * FROM users WHERE email = $1 OR username = $2`;
    const testQuery = `SELECT * FROM users WHERE email = ${loginInfo.email} OR username = ${loginInfo.username}`;
    console.log(testQuery);
    db.query(query, values)
      .then((data) => {
        const users = data.rows;
        res.send({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

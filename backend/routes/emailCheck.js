const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const loginInfo = req.query;
    const values = [loginInfo.email];
    const query = `SELECT * FROM users WHERE email = $1`;
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

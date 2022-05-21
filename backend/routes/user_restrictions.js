const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM user_restrictions`)
      .then((data) => {
        const user_restrictions = data.rows;
        res.send({ user_restrictions });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

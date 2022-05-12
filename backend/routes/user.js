const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM users
              WHERE id = ${req.params.id};`)
      .then((data) => {
        const users = data.rows;
        res.send({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
  router.put("/:id", (req, res) => {
    console.log("req", req)
    console.log("res",res)
    // db.query(`UPDATE users
    // WHERE id = ${req.params.id};
    // `)
  })
  return router;
};
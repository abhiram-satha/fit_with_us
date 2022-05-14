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
    // console.log(req.body.goal_weight)

    const values = [
      req.body.goal_weight,
      req.params.id
    ];

    const query = `UPDATE users SET goal_weight = $1 WHERE id = $2;`
    db.query(query, values)
      .then((data) => {
        res.send("Goal Weight updated")
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  })
  return router;
};
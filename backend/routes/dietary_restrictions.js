const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM dietary_restrictions`)
      .then((data) => {
        const dietary_restrictions = data.rows;
        res.send({ dietary_restrictions });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(
      `SELECT * FROM user_restrictions
    JOIN dietary_restrictions ON dietary_restrictions_id = dietary_restrictions.id
    WHERE user_id = ${req.params.id}
    `
    )
      .then((data) => {
        const users = data.rows;
        res.send({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const dietaryRestriction = req.body;
    const values = [req.body["user_id"], req.body.restriction];
    const query = `INSERT INTO user_restrictions(user_id, dietary_restrictions_id) VALUES ($1, (SELECT id FROM dietary_restrictions WHERE restriction = $2))`;

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

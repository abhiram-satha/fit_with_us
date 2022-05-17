const { application } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM weights
            WHERE user_id = ${req.params.id}
    ;`)
      .then((data) => {
        const weights = data.rows;
        res.send({ weights });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

      router.post("/:id", (req, res) => {
        const updatedWeight = req.body;

        const values = [
          req.params.id,
          new Date(),
          updatedWeight.newWeight
        ];
    
        const query = `INSERT INTO weights(user_id, date, weight) VALUES ($1, $2, $3)`;
    
        db.query(query, values)
          .then((data) => {
            res.send("Weight added");
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      });
  });

  return router;
};

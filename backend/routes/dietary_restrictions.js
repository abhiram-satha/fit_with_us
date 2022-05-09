const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    
    db.query(`SELECT * FROM user_restrictions
    JOIN dietary_restrictions ON dietary_restrictions_id = dietary_restrictions.id
    WHERE user_id = ${req.params.id}
    `)
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

const { application } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
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
  });

  return router;
};

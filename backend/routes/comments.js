const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.username AS username, comment.id AS id, comment.message AS message, comment.date AS date, comment.post_id AS parent_id FROM comment
    JOIN users on comment.user_id = users.id
    ORDER BY date;`)
      .then((data) => {
        const posts = data.rows;
        res.send({ posts });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT users.username AS username, comment.id AS id, comment.message AS message, comment.date AS date, comment.post_id AS parent_id FROM comment
    JOIN users on comment.user_id = users.id
    ORDER BY date;`
    )
      .then((data) => {
        const posts = data.rows;
        res.send({ posts });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => {
    const comment = req.body;
    const values = [
      req.params.id,
      comment.post_id,
      comment.message,
      new Date(),
    ];

    const query = `INSERT INTO comment(user_id, post_id, message, date) VALUES ($1, $2, $3, $4)`;

    db.query(query, values)
      .then((data) => {
        res.send("Comment added");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/all", (req, res) => {
    const userID = req.params.id;
    const values = [userID];
    const query = `SELECT COUNT(user_id) FROM comment WHERE user_id = $1`;

    db.query(query, values)
      .then((data) => {
        const total = data.rows[0];
        res.send({ total });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

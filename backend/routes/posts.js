const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT users.username AS username, post.id AS id, post.message AS message, post.date AS date FROM post
    JOIN users on post.user_id = users.id
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
    const posts = req.body;

    const values = [req.params.id, posts.message, new Date()];

    const query = `INSERT INTO post(user_id, message, date) VALUES ($1, $2, $3)`;

    db.query(query, values)
      .then((data) => {
        res.send("Post added");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.put("/:id", (req, res) => {
    const posts = req.body;

    const values = [req.params.id, posts.message];

    const query = `UPDATE post SET message = $2 WHERE id = $1`;

    console.log(query);
    db.query(query, values)
      .then((data) => {
        res.send("Post Updated");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/all", (req, res) => {
    const userID = req.params.id;
    const values = [userID];
    const query = `SELECT COUNT(user_id) FROM post WHERE user_id = $1`;

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

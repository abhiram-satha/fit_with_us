const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.username AS username, post.id AS id, post.message AS message, post.date AS date FROM post
    JOIN users on post.user_id = users.id
    ORDER BY date;`)
      .then((data) => {
        const posts = data.rows;
        res.send({ posts });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const posts = req.body;
    const values = [
      1,
      posts.message,
      new Date()
    ];

    const query = `INSERT INTO post(user_id, message, date) VALUES ($1, $2, $3)`;

    console.log(query);
    db.query(query, values)
      .then((data) => {
        res.send("Post added");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

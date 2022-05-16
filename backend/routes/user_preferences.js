const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    
    db.query(`SELECT * FROM user_preferences
    JOIN recipe_category ON recipe_category_id = recipe_category.id
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

  router.delete('/:id', (req, res)=> {

    const values = [
      req.params.id,
      req.body.category_value
    ]
    console.log(req.body)
    db.query(`DELETE FROM user_preferences
    WHERE user_id = $1 AND recipe_category_id = $2;`, values)
    .then((data) => {
      const users = data.rows;
      res.send({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  
  router.post('/:id', (req, res)=> {

    const values = [
      req.params.id,
      req.body.category_value
    ]
    console.log(values)
    db.query(`INSERT INTO user_preferences(user_id, recipe_category_id) VALUES ($1, $2)`, values)
    .then((data) => {
      const users = data.rows;
      res.send({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  return router;
};

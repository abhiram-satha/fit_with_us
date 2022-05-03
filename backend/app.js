const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const router = express.Router()
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())


app.get('/', (req, res)=> {
  axios.get("https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc")
    .then(response => res.send(response.data))
})

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`)
})
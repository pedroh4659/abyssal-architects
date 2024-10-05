const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html' , { root : public})
})

var timeline = require('./routes/timeline')
app.use('/timeline', timeline);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
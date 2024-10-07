const express = require('express')
require('dotenv').config()
var favicon = require('serve-favicon')
var path = require('path')
const app = express()
app.use(favicon(path.join(__dirname, 'logo.png')))

const port = process.env.PORT

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html' , { root : public})
})
app.get('/biosfera', (req, res) => {
  res.sendFile('html/biosfera.html', { root: path.join(__dirname, '/public') });
})
var timeline = require('./routes/timeline')
app.use('/timeline', timeline);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
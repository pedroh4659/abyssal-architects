const express = require('express')

const router = express.Router()

const path = require('path')

router.get('/', (req, res, next) => {
    res.sendFile('html/timeline.html', { root: path.join(__dirname, '../public') });
})
module.exports = router
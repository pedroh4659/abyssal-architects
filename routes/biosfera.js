const express = require('express')

const router = express.Router()

const path = require('path')

router.get('/', (req, res, next) => {
    res.sendFile('html/biosfera.html', { root: path.join(__dirname, '../public') });
})
router.get('/animalia', (req, res, next) => {
    res.sendFile('html/animalia.html', { root: path.join(__dirname, '../public') });
})
router.get('/cnidaria', (req, res, next) => {
    res.sendFile('html/cnidaria.html', { root: path.join(__dirname, '../public') });
})
router.get('/hadian', (req, res, next) => {
    res.sendFile('html/hadian.html', { root: path.join(__dirname, '../public') });
})
router.get('/monera', (req, res, next) => {
    res.sendFile('html/monera.html', { root: path.join(__dirname, '../public') });
})
router.get('/porifera', (req, res, next) => {
    res.sendFile('html/porifera.html', { root: path.join(__dirname, '../public') });
})
module.exports = router
const express = require('express')

const router = express.Router()

const path = require('path')

router.get('/teste', (req, res, next) => {
    res.sendFile('html/teste.html', { root: path.join(__dirname, '../public') });
})
router.get('/teste1', (req, res, next) => {
    res.sendFile('html/teste1.html', { root: path.join(__dirname, '../public') });
})
router.get('/teste2', (req, res, next) => {
    res.sendFile('html/teste2.html', { root: path.join(__dirname, '../public') });
})
router.get('/teste3', (req, res, next) => {
    res.sendFile('html/teste3.html', { root: path.join(__dirname, '../public') });
})

module.exports = router
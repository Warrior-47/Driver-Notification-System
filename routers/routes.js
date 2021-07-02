const model = require('../model/model')
const express = require('express')

const router = express.Router()

router.post("/register", (req, res, next) => {
    const data = req.body
    model.insertInfo(result => {
        console.log(result)
        res.json(result)

    }, data)
})

router.post("/place_order", (req, res, next) => {
    const data = req.body
    model.place_order(result => {
        console.log(result)
        res.json(result)

    }, data)
})

module.exports = router
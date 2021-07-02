const model = require('../model/model')
const express = require('express')

const router = express.Router()


router.get('/', (req, res, next) => {
    model.fetch((result) => {
        res.json(result)
    })
})



module.exports = router
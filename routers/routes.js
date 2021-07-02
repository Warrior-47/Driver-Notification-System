const model = require('../model/model')
const express = require('express')
const calculate = require('../Calculations/calculations')

const router = express.Router()

router.post("/register", (req, res, next) => {
    const data = req.body
    model.insertInfo(result => {
        console.log(result)
        res.json(result)

    }, data)
})

router.get('/notify', (req, res, next) => {
    id = req.query.id
    if (id) {
        model.fetchDriverInfo(id, ({success, data}) => {
            if (success) {
                res.json(calculate.completionRate(data))
            }else{
                res.json({'Error':"invalid driver id"})
            }
        })
    }
    else {
        res.json({id: 'You have to provide a Driver ID'})
    }
})

router.post("/place_order", (req, res, next) => {
    const data = req.body
    model.place_order(result => {
        console.log(result)
        res.json(result)

    }, data)
})

module.exports = router
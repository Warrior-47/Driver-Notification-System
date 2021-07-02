const model = require('../model/model')
const express = require('express')
const calculate = require('../Calculations/calculations')

const router = express.Router()


router.get('/', (req, res, next) => {
    model.fetch((result) => {
        res.json(result)
    })
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



module.exports = router
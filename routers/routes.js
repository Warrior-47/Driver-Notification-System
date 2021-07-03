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

router.get("/driver/:driver_id",(req,res,next) => {
    const driver_id = req.params.driver_id

    model.fetch_driver_info(driver_info => {
        var rides_cancelled = 0
        var rides_completed = 0

        if (driver_info.length === 0) {
            res.json({'Error':"invalid driver id"})

        }else {
            const {name, nid_number, phone, vehicle_id} = driver_info[0]
            if (driver_info.length === 2) {
                rides_cancelled = driver_info[0].rides
                rides_completed = driver_info[1].rides
            }
        
            res.json({
                "driver_id" : driver_id,
                "name" : name,
                "nid_number" : nid_number,
                "phone" : phone,
                "vehicle_id" : vehicle_id,
                "rides_cancelled" : rides_cancelled,
                "rides_completed" : rides_completed,
                "total_rides" : rides_cancelled + rides_completed
            })
        }
    }, driver_id)
})

module.exports = router
const express = require('express')
const model = require('../model/model')
const calculate = require('../Calculations/calculations')

const router = express.Router()

const isAuthenticated = (req, res, next) => {
    const token = req.query.token
    if (token == "dummy") {
        next()
    }else {
        res.json({"message": "Authorization failed"})
    }
}

router.post("/register", (req, res, next) => {
    const driver_info = req.body
    
    model.insert_driver(driver_info, result => {
        res.json(result)
    })
})

router.post("/place_order", (req, res, next) => {
    const order_info = req.body

    model.place_order(order_info, result => {
        res.json(result)

    })
})

router.get('/notify', (req, res, next) => {
    driver_id = req.query.driver_id

    if (driver_id) {
        model.fetch_completion_info(driver_id, ({success, driver_data, message}) => {
            if (success) {
                calculate.completionRate(driver_data, (completion_message) => {
                    res.json(completion_message)
                })

            }else{
                res.json({"Error": message})
            }
        })
    }
    else {
        res.json({message: 'You have to provide a Driver ID'})
    }
})

router.post("/admin", (req, res, next) => {
    const login_info = req.body
    
    model.check_login(login_info, authenticated => {
        if (authenticated) {
            res.json({
                success: true,
                token: 'dummy'
            })
        }else {
            res.json({
                success: false
            })
        }
    })
})

router.get("/driver/:driver_id", isAuthenticated, (req,res,next) => {
    const driver_id = req.params.driver_id

    model.fetch_driver_info(driver_id, ({success, driver_data, message}) => {
        if (success){
            calculate.ride_information(driver_data, 
                ({rides_cancelled, rides_completed, total_rides}) => {
                    const {name, nid_number, phone, vehicle_id} = driver_data[0]
                    
                    res.json({
                        "driver_id" : driver_id,
                        "name" : name,
                        "nid_number" : nid_number,
                        "phone" : phone,
                        "vehicle_id" : vehicle_id,
                        "rides_cancelled" : rides_cancelled,
                        "rides_completed" : rides_completed,
                        "total_rides" : total_rides

                    })
            })

        }else {
            res.json({
                "Error": message
            })
        }
        
    })
})

module.exports = router
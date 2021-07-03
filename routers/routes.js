const model = require('../model/model')
const express = require('express')
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
    const data = req.body
    
    model.insertInfo(result => {
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
        res.json(result)

    }, data)
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
            var rides_cancelled = 0
            var rides_completed = 0

            if (driver_data.length === 0) {
                res.json({'Error':"invalid driver id"})

            }else {
                const {name, nid_number, phone, vehicle_id} = driver_data[0]
                if (driver_data.length === 2) {
                    rides_cancelled = driver_data[0].rides
                    rides_completed = driver_data[1].rides
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

        }else {
            res.json({
                success: false,
                message: message
            })
        }
        
    })
})

module.exports = router
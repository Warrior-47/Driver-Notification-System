const db = require('../util/db')
const hash = require('../verification/hashing')

class Model {
    static validate_driver_id(driver_id, cb) {
        db.execute("SELECT driver_id FROM drivers WHERE driver_id=?", [driver_id]).then(
            result => {
                if(result[0].length !== 0) {
                    cb({ success: true })

                }else {
                    cb({ 
                        success: false,
                        message: "invalid driver id"
                    })
                }
            })
    }

    static fetch_completion_info(driver_id, cb) {
        Model.validate_driver_id(driver_id, ({success, message}) => {
            if (success) {
                db.execute("SELECT status, COUNT(status) AS rides FROM (SELECT status FROM order_completion WHERE driver_id=? AND DATE(timestamp) < CURDATE() ORDER BY timestamp DESC LIMIT 100) AS T GROUP BY status ORDER BY status;", [driver_id]).then(
                    result => {
                        cb({
                            success: true,
                            driver_data: result[0]
                        })
                    }).catch(err => {
                        cb({
                            success: false,
                            message: err.message
                        })
                    })

            }else {
                cb({
                    success: false,
                    message: message
                })
            }
        })
    }
    
    static insert_driver({ name, nid_number, phone, vehicle_id }, cb) {
        db.execute('SELECT nid_number, vehicle_id FROM drivers WHERE nid_number=? OR vehicle_id=?', [nid_number, vehicle_id]).then(
            (driver_info) => {
                if (driver_info[0].length !== 0) {
                    cb({
                        success: false,
                        'message': 'NID number or Vehicle ID already registered'
                    })

                }else {
                    db.execute("insert into drivers(name, nid_number,phone,vehicle_id) values(?,?,?,?)", [name, nid_number, phone, vehicle_id]).then(
                        (result) => {
                            cb({
                                success: true,
                                'message': "Successfully Registered"
                            })
                        }).catch(err => {
                            cb({
                                success: false,
                                'message': err.message
                            })
                        })
                }
            }).catch(err => {
                cb({
                    success: false,
                    "message": err.message
                })
            })
    }

    static place_order({order_id, driver_id, status}, cb) {
        db.execute("insert into order_completion(order_id, driver_id, status) values(?,?,?)", [order_id, driver_id, status]).then(
            (result) => {
                cb({
                    success: true,
                    'message': "Inserted Order Successfully"
                })
            }).catch(err => {
                cb({
                    success: false,
                    'message': err.message
                })
            })
    }

    static check_login({username, password}, cb) {
        db.execute("SELECT username, password FROM admin_login WHERE username=?", [username]).then(
            (result) => {
                if (result[0].length === 0) {
                    cb(false)
                }else{
                    hash.verify(password, result[0][0].password, auth => {
                        if (auth) {
                            cb(true)
                        }else {
                            cb(false)
                        }
                    })
                }
            }
         )
    }

    static fetch_driver_info (driver_id, cb) {
        db.execute("SELECT name, nid_number, phone, vehicle_id, status, COUNT(status) AS rides FROM (SELECT name, nid_number, phone, vehicle_id, status FROM order_completion o RIGHT JOIN drivers d ON d.driver_id=o.driver_id WHERE d.driver_id=?) AS T GROUP BY name, nid_number, phone, vehicle_id, status ORDER BY status;", [driver_id])
        .then(
            result => {
                if (result[0].length !== 0) {
                    cb({
                        success: true,
                        driver_data: result[0]
                    })
                
                }else {
                    cb({
                        success: false,
                        message: "invalid driver id"
                    })
                }

            }).catch(err => {
                cb({
                    success: false,
                    message: err.message
                })
            })
    }
}

module.exports = Model
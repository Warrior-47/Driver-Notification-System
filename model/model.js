const db = require('../util/db')

class Model {
    static insertInfo(cb, driver) {
        const { name, nid_number, phone, vehicle_id } = driver
        db.execute("insert into drivers(name, nid_number,phone,vehicle_id) values(?,?,?,?)", [name, nid_number, phone, vehicle_id]).then(
            (result) => {
                cb({ 'success': true })
            })
    }

    static place_order(cb, order_completion) {
        const { order_id, driver_id, status } = order_completion
        db.execute("insert into order_completion(order_id, driver_id, status) values(?,?,?)", [order_id, driver_id, status]).then(
            (result) => {
                cb({ 'success': true })
            })
    }
}

module.exports = Model
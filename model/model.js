const db = require('../util/db')

class Model {
    static insertInfo(cb, driver) {
        const { name, nid_number, phone, vehicle_id } = driver
        db.execute("insert into drivers(name, nid_number,phone,vehicle_id) values(?,?,?,?)", [name, nid_number, phone, vehicle_id]).then(
            (result) => {
                cb({ 'success': true })
            })
    }
}

module.exports = Model
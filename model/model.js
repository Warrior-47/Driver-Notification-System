const db = require('../util/db')

class Model {
    static fetchDriverInfo(id, cb) {
        try {
            db.execute("SELECT count(*) AS rides FROM (SELECT status FROM order_completion o RIGHT JOIN drivers d ON d.driver_id=o.driver_id WHERE d.driver_id=? AND (date(timestamp)<CURDATE() OR status IS NULL) ORDER BY timestamp desc limit 100) AS T GROUP BY status ORDER BY status;",
            [id]).then(
                (res) => {
                    if(res[0].length !== 0){
                        cb({
                            success: true,
                            data: res[0]
                        })
                    }else {
                        cb({
                            success: false
                        })
                    }
                    
                }
            )
        }catch(e) {
            
        }
    }

    static driverExists(id, cb) {
        try {
            db.execute("SELECT driver_id from drivers where driver_id=?", [id]).then(
                res => {
                    if (res[0].length !== 0) {
                        cb({'success': true})
                    }else {
                        cb({'success': false})
                    }
                }
            )
        }catch (e) { }
    }
}

module.exports = Model
const db = require('../util/db')

class Model {
    static fetch(cb) {
        db.execute("select * from drivers").then(
            (res) => {
                cb(res[0])
            }
        )
    }
}

module.exports = Model
const bcrpyt = require('bcrypt')

class Hashing {
    static verify(pass, hash, cb) {
        bcrpyt.compare(pass, hash).then(res => {
            cb(res)
        })
    }
}

module.exports = Hashing
const mysql = require('mysql2')

const options = {
    host: '127.0.0.1',
    user: 'root',
    password: 'asd',
    database: 'notification_system'
}

const pool = mysql.createPool(options)

module.exports = pool.promise()
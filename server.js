const router = require('./routers/routes')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(9000, console.log('Server Start at port 9000'))
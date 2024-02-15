const express = require('express')
const app = express()

const dbConnection = require('./config/config')
const router = require('./routes/posts')

app.use(express.json())
app.use('/', router)
dbConnection()

module.exports = app;
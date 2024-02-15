const { default: mongoose } = require('mongoose')
require('dotenv').config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected to database')
    }
    catch (error) {
        console.error(error)
        console.log('Failed to connect to database', error)
    }
}

module.exports = dbConnection
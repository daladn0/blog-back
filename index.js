require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/Error.middleware')
const router = require('./routes')

const app = express()

app.use(cors())
app.use(morgan(':method :url :status :response-time ms'))
app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())

app.use('/api/v1', router)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Up and running on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
        process.exit(1)
    }
}

startApp()
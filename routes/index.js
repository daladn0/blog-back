const { Router } = require('express')
const router = Router()

const userRoute = require('./User.route')

router.use('/user', userRoute)

module.exports = router
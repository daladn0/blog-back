const { Router } = require('express')
const router = Router()

const userRoute = require('./User.route')
const categoryRoute = require('./Category.route')

router.use('/user', userRoute)
router.use('/category', categoryRoute)

module.exports = router
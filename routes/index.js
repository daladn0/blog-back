const { Router } = require('express')
const router = Router()

const userRoute = require('./User.route')
const categoryRoute = require('./Category.route')
const postRoute = require('./Post.route')

router.use('/user', userRoute)
router.use('/category', categoryRoute)
router.use('/post', postRoute)

module.exports = router
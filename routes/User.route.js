const { Router } = require('express')
const router = Router()
const UserController = require('../controllers/User.controller')

router.post('/', UserController.registration)

module.exports = router
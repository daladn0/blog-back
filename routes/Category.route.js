const { body } = require('express-validator')
const { Router } = require('express')
const router = Router()
const CategoryController = require('../controllers/Category.controller')
const authMiddleware = require('../middlewares/Auth.middleware')
const roleMiddleware = require('../middlewares/Role.middleware')
const { CATEGORY_MIN_TITLE, CATEGORY_MAX_TITLE, ROLES } = require('../constants')

router.post(
    '/',
    authMiddleware,
    roleMiddleware([ROLES.ADMIN]),
    body('title').trim().isLength({min: CATEGORY_MIN_TITLE, max: CATEGORY_MAX_TITLE}).withMessage(`Category title should have from ${CATEGORY_MIN_TITLE} up to ${CATEGORY_MAX_TITLE} chars`),
    CategoryController.create
)

module.exports = router
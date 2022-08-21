const { body, param } = require('express-validator')
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

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware([ROLES.ADMIN]),
    param('id', 'Id is not provided'),
    body('title').trim().isLength({min: CATEGORY_MIN_TITLE, max: CATEGORY_MAX_TITLE}).withMessage(`Category title should have from ${CATEGORY_MIN_TITLE} up to ${CATEGORY_MAX_TITLE} chars`),
    CategoryController.update
)

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware([ROLES.ADMIN]),
    param('id', 'Id is not provided'),
    CategoryController.delete
)


module.exports = router
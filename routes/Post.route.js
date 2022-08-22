const { body, param } = require('express-validator')
const { Router } = require('express')
const router = Router()
const PostController = require('../controllers/Post.controller')
const { POST_TITLE_MIN_LENGTH, POST_TITLE_MAX_LENGTH } = require('../constants')
const authMiddleware = require('../middlewares/Auth.middleware')

router.get('/', PostController.getAll)
router.get(
    '/:id',
    param('id', 'Id is not provided'),
    PostController.getOne
)
router.post(
    '/',
    authMiddleware,
    body('title', `Post\'s title should have from ${POST_TITLE_MIN_LENGTH} up to ${POST_TITLE_MAX_LENGTH} chars`).trim().isLength({min: POST_TITLE_MIN_LENGTH, max: POST_TITLE_MAX_LENGTH}),
    PostController.create
)
router.put(
    '/:id',
    param('id', 'Id is not provided'),
    PostController.update
)
router.delete(
  '/:id',
  param('id', 'Id is not provided'),
  PostController.delete
)


module.exports = router
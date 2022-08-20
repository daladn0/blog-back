const { body} = require("express-validator");
const { Router } = require("express");
const router = Router();
const { PASSWORD_MIN_LENGTH } = require('../constants')

const UserController = require("../controllers/User.controller");

router.post(
  "/registration",
  body('username', 'Username is not provided').trim().not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password can\' be empty').trim().not().isEmpty().isLength({min: PASSWORD_MIN_LENGTH}).withMessage(`Password can\'t be shorter than ${PASSWORD_MIN_LENGTH} chars`),
  UserController.registration
);

router.post("/login", UserController.login);

router.get('/refresh', UserController.refresh)

router.get('/logout', UserController.logout)

module.exports = router;

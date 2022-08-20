const { validationResult } = require("express-validator");
const UserService = require("../services/User.service");
const ApiError = require("../errors/ApiError");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Invalid credentials", errors.array());
      }

      const { email, username, password } = req.body;

      const user = await UserService.registration(username, email, password);

      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Invalid credentials", errors.array());
      }

      const { email, password, username } = req.body;

      const userData = await UserService.login(username, email, password);

      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.send(userData);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req?.cookies?.refreshToken;

      const userData = await UserService.refresh(refreshToken)

      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.send(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    const refreshToken = req?.cookies?.refreshToken

    await UserService.logout(refreshToken)

    res.clearCookie('refreshToken')

    res.sendStatus(200)
  }
}

module.exports = new UserController();

const { JWT_TOKEN_TYPES } = require("../constants");
const ApiError = require("../errors/ApiError");
const TokenService = require("../services/Token.service");
const UserService = require("../services/User.service");

module.exports = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    const authorization = req?.headers?.authorization;

    if (!authorization) throw ApiError.Unauthorized();

    const token = authorization.split(" ")[1];

    const decodedToken = TokenService.validateToken(
      token,
      JWT_TOKEN_TYPES.ACCESS
    );

    const foundUser = await UserService.findById(decodedToken.id);

    if (!foundUser)
      throw ApiError.BadRequest("User with given token does not exist");

    if (!decodedToken) throw ApiError.Forbidden();

    req.user = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

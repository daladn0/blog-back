const ApiError = require("../errors/ApiError");
const UserModel = require("../models/User.model");
const RoleModel = require("../models/Role.model");
const TokenService = require("./Token.service");
const UserDTO = require("../dtos/userDTO");
const bcrypt = require("bcryptjs");
const { JWT_TOKEN_TYPES } = require("../constants");
const { ROLES } = require('../constants')
const ObjectId = require('mongoose').Types.ObjectId

class UserService {
  async registration(username, email, password) {
    const candidate = await UserModel.findOne({
      $or: [{ email: { $eq: email } }, { username: { $eq: username } }],
    });

    if (candidate) {
      throw ApiError.BadRequest(
        "User with such an email or password already exists"
      );
    }

    const userRole = await RoleModel.findOne({ value: ROLES.USER });
    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT)
    );
    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      roles: [userRole.value],
    });
    return new UserDTO(user);
  }

  async login(username, email, password) {
    const foundUser = await UserModel.findOne({
      $or: [{ email: { $eq: email } }, { username: { $eq: username } }],
    });

    if (!foundUser) {
      throw ApiError.BadRequest("Incorrect credentials");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordCorrect) throw ApiError.BadRequest("Incorrect credentials");

    const userDto = new UserDTO(foundUser)
    
    const tokens = TokenService.generateTokens({ id: foundUser._id, roles: foundUser.roles });

    foundUser.refreshToken = tokens.refreshToken;

    await foundUser.save();

    return {
      user: {...userDto, avatar: foundUser.avatar},
      tokens,
    };
  }

  async refresh(refreshToken) {

    if (!refreshToken) throw ApiError.Unauthorized();

    const tokenData = TokenService.validateToken(
      refreshToken,
      JWT_TOKEN_TYPES.REFRESH
    );

    if (!tokenData) throw ApiError.Unauthorized();

    const user = await UserModel.findOne({refreshToken});

    if (!user) throw ApiError.Unauthorized();

    const userDto = new UserDTO(user);

    const tokens = TokenService.generateTokens({ id: user._id, roles: user.roles });

    user.refreshToken = tokens.refreshToken;

    await user.save();

    return {
      user: {
        email: user.email,
        username: user.username,
        avatar: user.avatar
      },
      tokens,
    }
  }

  async logout(refreshToken) {
    await UserModel.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } })
    return 
  }

  async findById(id) {
    if ( !id || !ObjectId.isValid(id) ) throw ApiError.Internal('Invalid user id provided')

    return await UserModel.findById(id)
  }
}

module.exports = new UserService();

const jwt = require("jsonwebtoken");
const { JWT_TOKEN_TYPES } = require("../constants");
const ApiError = require("../errors/ApiError");

class TokenService {
  /**
   * Generate pair of access/refresh tokens
   * @param {Object} payload object of data to be encoded into jwt token
   * @returns object with access and refresh tokens
   */
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Validate JWT
   * @param {string} token jwt refresh token to verify
   * @returns decoded data from token
   */
  validateToken(token, type) {
    try {
      let secretKey;

      switch (type) {
        case JWT_TOKEN_TYPES.ACCESS:
          secretKey = process.env.JWT_ACCESS_SECRET;
          break;

        case JWT_TOKEN_TYPES.REFRESH:
          secretKey = process.env.JWT_REFRESH_SECRET;
          break;

        default:
          throw ApiError.Internal("Invalid token type");
      }

      const tokenData = jwt.verify(token, secretKey);

      return tokenData;
    } catch {
      return null;
    }
  }
}

module.exports = new TokenService();

const { JWT_TOKEN_TYPES } = require('../constants')
const ApiError = require('../errors/ApiError')
const TokenService = require('../services/Token.service')

module.exports = (req, res, next) => {
    try {
        if ( req.method === 'OPTIONS' ) {
            return next()
        }

        const authorization = req?.headers?.authorization

        if ( !authorization ) throw ApiError.Unauthorized()

        const token = authorization.split(' ')[1]

        const decodedToken = TokenService.validateToken(token, JWT_TOKEN_TYPES.ACCESS)

        if ( !decodedToken ) throw ApiError.Forbidden()

        req.user = decodedToken
        next()
    } catch(err) {
        next(err)
    }
}
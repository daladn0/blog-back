const ApiError = require('../errors/ApiError')

module.exports = (roles) => {
    return (req, res, next) => {
        try {
            if ( req.method === 'OPTIONS' ) {
                return next()
            }

            let hasRole

            roles.forEach( role => {
                req.user.roles.forEach( userRole => {
                    if ( userRole === role ) hasRole = true
                })
            } )

            if ( !hasRole ) throw ApiError.Forbidden()
            
            return next()

        } catch(err) {
            next(err)
        }
    }
}
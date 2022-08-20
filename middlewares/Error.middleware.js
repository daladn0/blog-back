const ApiError = require('../errors/ApiError')

module.exports = (err, req, res, next) => {
    console.log(err)

    if ( err instanceof ApiError ) {
        return res.status(err.status).json({ message: err.message, errors: err.errors }) 
    }

    res.status(500).json({message: 'Internal Server Error'})
}
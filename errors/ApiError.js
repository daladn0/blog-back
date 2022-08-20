module.exports = class ApiError extends Error {
    constructor(message, status, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors) {
        return new ApiError(message, 400, errors)
    }

    static Unauthorized() {
        return new ApiError('Unauthorized', 401)
    }
}
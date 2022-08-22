module.exports = class ApiError extends Error {
    /**
     * Custom ApiError class extended from native Error class
     * @param {string} message error message
     * @param {string|number} status http status code
     * @param {Array} errors errors array
     */
    constructor(message, status, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    /**
     * BadRequest
     * @param {string} message error message
     * @param {Array} errors errors array
     * @returns ApiError instance with 400 http status code ( custom error extended from native Error class )
     */
    static BadRequest(message, errors) {
        return new ApiError(message, 400, errors)
    }

    /**
     * Unauthorized error
     * @returns ApiError instance with 401 http status code
     */
    static Unauthorized() {
        return new ApiError('Unauthorized', 401)
    }

    /**
     * Internal server error
     * @param {string} message error message
     * @returns ApiError instance with 500 http status code
     */
    static Internal(message) {
        return new ApiError(message, 500)
    }

    /**
     * Forbidden Error (403)
     * @returns ApiError instance with 403 http status code
     */
    static Forbidden(){
        return new ApiError('Forbidden', 403)
    }

    /**
     * 404 Not Found error
     * @param {string} message error message
     * @returns ApiError instance with 404 http status code
     */
    static NotFound(message) {
        return new ApiError(message, 404)
    }
}
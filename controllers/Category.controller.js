const { validationResult } = require('express-validator')
const ApiError = require('../errors/ApiError')
const CategoryService = require('../services/Category.service')

class CategoryController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid parameters', errors.array())
            }

            const { title } = req.body

            const newCategory = await CategoryService.create(title)

            res.send(newCategory)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new CategoryController
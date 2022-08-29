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

    async update(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid body/parameters', errors.array())
            }

            const {id} = req.params
            const {title} = req.body

            const updatedCategory = await CategoryService.update(id, title)

            res.send(updatedCategory)
        } catch(err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid parameters', errors.array())
            }

            const { id } = req.params

            await CategoryService.delete(id)

            res.sendStatus(200)

        } catch(err) {
            next(err)
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await CategoryService.getAll()
            res.send(categories)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new CategoryController
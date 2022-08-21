const ObjectId = require('mongoose').Types.ObjectId
const ApiError = require('../errors/ApiError')
const CategoryModel = require('../models/Category')

class CategoryService {
    async create(title) {
        const candidate = await CategoryModel.findOne({title})

        if ( candidate ) throw ApiError.BadRequest('Category already exists')

        const newCategory = await CategoryModel.create({title})
        
        return newCategory
    }

    async update(id, updatedTitle) {
        const isValidId = ObjectId.isValid(id)

        if ( !isValidId ) throw ApiError.BadRequest('Invalid ID provided')

        const foundCategory = await CategoryModel.findById(id)

        if ( !foundCategory ) throw ApiError.BadRequest('Category with given ID does not exist')

        foundCategory.title = updatedTitle

        await foundCategory.save()

        return foundCategory
    }

    async delete(id) {
        const isValidId = ObjectId.isValid(id)

        if ( !isValidId ) throw ApiError.BadRequest('Invalid ID provided')

        await CategoryModel.findByIdAndRemove(id)
    }
}

module.exports = new CategoryService()
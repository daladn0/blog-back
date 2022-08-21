const ApiError = require('../errors/ApiError')
const CategoryModel = require('../models/Category')

class CategoryService {
    async create(title) {
        const candidate = await CategoryModel.findOne({title})

        if ( candidate ) throw ApiError.BadRequest('Category already exists')

        const newCategory = await CategoryModel.create({title})
        
        return newCategory
    }
}

module.exports = new CategoryService()
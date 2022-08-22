const PostModel = require('../models/Post.model')
const ObjectId = require('mongoose').Types.ObjectId
const ApiError = require('../errors/ApiError')
const { POST_TITLE_MIN_LENGTH, POST_TITLE_MAX_LENGTH, POST_BODY_MIN_LENGTH, POST_BODY_MAX_LENGTH } = require('../constants')

class PostService {
    validatePostTitle(title) {
        if ( title ) {
            if ( title.length < POST_TITLE_MIN_LENGTH || title.length > POST_TITLE_MAX_LENGTH ) {
                throw ApiError.BadRequest(`Post\'s title should have from ${POST_TITLE_MIN_LENGTH} up to ${POST_TITLE_MAX_LENGTH} chars`)
            }
        }
    }

    validatePostBody(body) {
        if ( body ) {
            if ( body.length < POST_BODY_MIN_LENGTH || body.length > POST_BODY_MAX_LENGTH ) {
                throw ApiError.BadRequest(`Post\'s body should have from ${POST_BODY_MIN_LENGTH} up to ${POST_BODY_MAX_LENGTH} chars`)
            }
        }
    }

    validatePostCategories(categories) {
        if ( categories ) {

            if ( !Array.isArray(categories) ) throw ApiError.BadRequest('Invalid categories list provided')

            categories.forEach(category => {
                const isCategoryValid = ObjectId.isValid(category)
                if ( !isCategoryValid ) throw ApiError.BadRequest('Invalid category ID provided')
            })
        }
    }

    async getAll() {
        const posts = await PostModel.find().populate('author', 'username email avatar').populate('categories', 'title')
        return posts
    }

    async getOne(id) {
        const isIdValid = ObjectId.isValid(id)

        if ( !isIdValid ) throw ApiError.BadRequest('Invalid ID provided')

        const foundPost = await PostModel.findById(id).populate('author', 'username email avatar').populate('categories', 'title')
        
        if ( !foundPost ) throw ApiError.NotFound('Post with given ID does not exist')

        return foundPost
    }

    async create(title, body, author, categories) {
        this.validatePostBody(body)

        this.validatePostCategories(categories)

        const createdPost = await PostModel.create({title, body, author, categories})
        return createdPost
    }

    async update(id, title, body, categories) {
        const isIdValid = ObjectId.isValid(id)

        if ( !isIdValid ) throw ApiError.BadRequest('Invalid ID provided')

        const foundPost = await PostModel.findById(id)

        if ( !foundPost ) throw ApiError.NotFound('Post with given ID does not exist ')
 
        this.validatePostTitle(title)
        this.validatePostBody(body)
        this.validatePostCategories(categories)

        if ( title ) {
            foundPost.title = title
        }

        if ( body ) {
            foundPost.body = body
        }

        if ( categories ) {
            foundPost.categories = categories
        }

        foundPost.updatedAt = Date.now()

        await foundPost.save()

        return foundPost
    }

    async delete(id) {
        const isIdValid = ObjectId.isValid(id)

        if ( !isIdValid ) throw ApiError.BadRequest('Invalid ID provided')

        await PostModel.findByIdAndRemove(id)
    }
}

module.exports = new PostService()
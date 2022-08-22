const { validationResult } = require('express-validator')
const ApiError = require('../errors/ApiError')
const PostService = require('../services/Post.service')

class PostController {
    async getAll(req, res, next) {
        try {
            const posts = await PostService.getAll()

            res.json(posts)
        } catch(err) {
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid parameters', errors.array())
            }

            const { id } = req.params

            const post = await PostService.getOne(id)

            res.send(post)
        } catch(err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid body', errors.array())
            }
            
            const { title, body, categories } = req.body

            const createdPost = await PostService.create(title, body, req.user.id, categories)

            res.send(createdPost)
        } catch(err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) {
                throw ApiError.BadRequest('Invalid body/params', errors.array())
            }

            const { id } = req.params
            const { title, body, categories } = req.body

            const updatedPost = await PostService.update(id, title, body, categories)

            res.send(updatedPost)
        } catch(err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const errors = validationResult(req)

            if ( !errors.isEmpty() ) throw ApiError.BadRequest('ID is not provided', errors.array())

            const { id } = req.params

            await PostService.delete(id)

            res.sendStatus(200)

        } catch(err) {
            next(err)
        }
    }

}

module.exports = new PostController()
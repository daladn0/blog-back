const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema =  new Schema({
    title: { type: String },
    body: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    author: { type: ObjectId, ref: 'User' },
    categories: [{type: ObjectId, ref: 'Category'}]
})

module.exports = model('Post', schema)
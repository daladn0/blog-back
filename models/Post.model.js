const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema =  new Schema({
    title: { type: String, required: true },
    body: { type: String },
    image: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    author: { type: ObjectId, ref: 'User' },
    categories: [{type: ObjectId, ref: 'Category'}]
})

module.exports = model('Post', schema)
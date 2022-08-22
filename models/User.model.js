const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema =  new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    savedPosts: [{ type: ObjectId, ref: 'Post' }],
    refreshToken: {type: String},
    roles: [{ type: String, ref: 'Role' }]
})

module.exports = model('User', schema)
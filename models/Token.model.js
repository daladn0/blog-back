const { model, Schema } = require('mongoose')

const schema =  new Schema({
    refreshToken: { type: String, required: true }
})

module.exports = model('Token', schema)
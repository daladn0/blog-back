const { model, Schema } = require('mongoose')

const schema =  new Schema({
    title: { type: String },
    image: { type: String },
})

module.exports = model('Category', schema)
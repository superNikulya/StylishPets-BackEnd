const mongoose = require('mongoose')
const {SchemaTypes} = require("mongoose")
const Schema = mongoose.Schema
// нам необходимо создать схему, которуая будет описывать нашу модель посредством переменной мангуса
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type:String,
        default: ''
    },
    price: {
        type:Number,
        required: true
    },
    category:{
        ref: 'categories',
        type: Schema.Types.ObjectId,
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    characteristic: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model ('products', productSchema)
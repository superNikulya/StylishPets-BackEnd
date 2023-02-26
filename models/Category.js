const mongoose = require('mongoose')
const {SchemaTypes} = require("mongoose")
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type:String,
        default: ''
    },
    user:{
        required: false,
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    characteristic: {
        type: String,
        default: ''
    }

})
module.exports = mongoose.model ('categories', categorySchema)
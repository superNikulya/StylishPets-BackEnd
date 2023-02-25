const mongoose = require('mongoose')
const {SchemaTypes} = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        admin: Boolean,
    }
})
module.exports = mongoose.model ('users', userSchema)
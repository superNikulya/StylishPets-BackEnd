const mongoose = require('mongoose')
const {SchemaTypes} = require("mongoose")
const Schema = mongoose.Schema
// нам необходимо создать схему, которуая будет описывать нашу модель посредством переменной мангуса
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

}) //прееменная categorySchema  отвечает за схему категории
// является результатом работы конструткора и куда мы передаем объект конфигурации
// после описания схемы мы можем создавать модель
module.exports = mongoose.model ('categories', categorySchema)
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
    categoryId:{
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    categoryName:{
        type: String,
    },
    user:{
        ref: 'users',
        required: false,
        type: Schema.Types.ObjectId
    },
    characteristic: {
        type: String,
        required: true,
}//Каждые позиции являются дочерними элементами от
    // опреденной катеогории и позиции могут хранить в себе айди
    // той категории к которой они преналежат
}) //прееменная categorySchema  отвечает за схему категории
// является результатом работы конструткора и куда мы передаем объект конфигурации
// после описания схемы мы можем создавать модель
module.exports = mongoose.model ('products', productSchema)
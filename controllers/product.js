const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const Category = require("../models/Category");

module.exports.getAllProducts = async function (req, res) {
    try {
        let products = await Product.find({})
        res.status(200).json(products)
    } catch (e){
        errorHandler(res, e)
    }
}
module.exports.getByCategoryId = async function (req, res) {
    try {
        const products = await Product.find({
            categoryId: req.params.categoryId,
        })
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getByCategoryName = async function (req, res) {
    try {
        const products = await Product.find({
            categoryName: req.body.categoryName
        })
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    try {
        const product = await new Product ({
            name: req.body.name,
            price: req.body.price,
            characteristic: req.body.characteristic,
            categoryId: req.body.categoryId,
            categoryName: req.body.categoryName,
            imageSrc: req.file ? req.file.path : '',
    }).save()
        res.status(201).json(product) //полсе сохарнения в базу данных придет статутс и ами позиции
    } catch (e)
    {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {//данный метод поомгает удалять что-то из базы данных
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Product was deleted'//полсе сохарнения в базу данных придет статутс и ами позиции
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update =  async function (req, res) {
    const updated= {
        name: req.body.name,
        price: req.body.price,
        characteristic: req.body.characteristic
    }
    if (req.file){//проверяем есть ли у нас в объекте реквест объект файл, если есть
        // то мы объекту апдейтд его полю имеджсрц присваиваем значение req.file.path
        updated.imageSrc = req.file.path }
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    }
catch(e)
    {
        errorHandler(res, e)
    }
}
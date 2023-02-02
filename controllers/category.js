const Category = require('../models/Category')
const Position = require("../models/Product");
const errorHandler = require("../utils/errorHandler");
module.exports.getAll = async  function (req, res) {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) { //тут нам нужно получить айди определенной категории //:id
    try {
        const category = await Category.findById(req.params.id)
    //уловие не пишем, потому что айди будет уникальным по записи в базе данных
    res.status(200).json(category)
     } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})//удаляет из позиций категорию и все дочерние позииции в ней
        res.status(200).json({
            message: 'Category was deleted'//полсе сохарнения в базу данных придет статутс и ами позиции
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const category = new Category ({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
            errorHandler(res, e)
        }
    }
module.exports.update = async function (req, res) {
    const updated = {
    name: req.body.name
    }//формируем объект,  добавить те новые данные, которыем мы изменяем в нужной нам категории
    if (req.file){//проверяем есть ли у нас в объекте реквест объект файл, если есть
        // то мы объекту апдейтд его полю имеджсрц присваиваем значение req.file.path
        updated.imageSrc = req.file.path }
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},//мы вытаскиваем айди категории,
            // данный параметр берется из роутов, когда мы взываем метод патч
            {$set: updated}, // изменить нужную категорию найднную с помощью новых данных
            {new: true}
        )
        res.status(200).json(category)
    } catch(e)
    {
        errorHandler(res, e)
    }
}
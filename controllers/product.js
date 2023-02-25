const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllProducts = async function (req, res) {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (e){
        errorHandler(res, e)
    }
}
module.exports.getByCategoryId = async function (req, res) {
    try {
        const products = await Product.find({
            category: req.params.category,
        })
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id)
            res.status(200).json(product)
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
            category: req.body.category,
            imageSrc: req.file ? req.file.path : '',
    }).save()
        res.status(201).json(product)
    } catch (e)
    {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Product was deleted'
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
    if (req.file){
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
Product = require('../models/Product')
let ObjectId = require('mongoose').Types.ObjectId;

exports.productsGetAll = (req, res, next) => {
    Product.find()
        .select()
        .exec()
        .then(products => {
            res.status(200).json({
                message: `Total products ${products.length}`,
                products: products.map(product => {
                    return product
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.productSearch = (req, res, next) => {
    Product.find({$text: {$search: req.params.phrase}}, (error, result) => {
        if (!error) {
            res.status(200).json({
                products: result
            })
        } else {
            res.status(500).json({
                error: error
            })
        }
    })
}

exports.addProduct = (req, res, next) => {
    Product.create({
        _id: new ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        countPerPackage: req.body.countPerPackage,
        price: req.body.price,
        pricePerPackage: req.body.pricePerPackage,
        sellingPrice: req.body.sellingPrice,
        imgUrl: req.body.imgUrl.length === 0 ? 
            'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjM0O6rx9PgAhXorFQKHThgCtUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.vexels.com%2Fpng-svg%2Fpreview%2F152579%2Forange-circle-question-mark-icon&psig=AOvVaw1QsmWyGpayGx781ZNZfL2S&ust=1551069777545731' : 
            req.body.imgUrl
    }, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            })
        } else {
            res.status(200).json({
                message: "Product added!"
            })
        }
    })
}
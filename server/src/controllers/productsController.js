Product = require('../models/Product')

exports.productsGetAll = (req, res, next) => {
    console.log('Getting all products...')
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
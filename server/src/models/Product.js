const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'carts'},
    product: {type: String, required: true},
    quantity: {type: Number, required: true},
    countPerPackage: {type: Number, required: true},
    price: {type: Number, required: true},
    pricePerPackage: {type: Number, required: true},
    sellingPrice: {type: Number, required: true},
    imgUrl: {type: String, required: true},  
})

module.exports = mongoose.model('Product', ProductSchema, 'products')
 
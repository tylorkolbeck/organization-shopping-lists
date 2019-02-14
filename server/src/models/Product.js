const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: String, required: true},
    quantity: {type: Number, required: true},
    "countPerPackage": {type: Number, required: true},
    price: {type: Number, required: true},
    "pricePerPackage": {type: Number, required: true},
    "sellingPrice": {type: Number, required: true},
    "img-url": {type: String, required: true}  
})

module.exports = mongoose.model('Product', ProductSchema)

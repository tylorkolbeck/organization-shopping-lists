const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: String, required: true},
    quantity: {type: Number, required: true},
    "count-per-package": {type: Number, required: true},
    price: {type: Number, required: true},
    "price-per-package": {type: Number, required: true},
    "selling-price": {type: Number, required: true},
    "img-url": {type: String, required: true}  
})

module.exports = mongoose.model('Product', ProductSchema)

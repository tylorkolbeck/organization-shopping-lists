const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'carts'},
    product: {type: String, required: true},
    quantity: {type: Number, default: 1},
    countPerPackage: {type: Number, required: true},
    price: {type: Number, required: true},
    pricePerPackage: {type: Number, required: false, default: this.price},
    sellingPrice: {type: Number, required: true},
    imgUrl: {type: String, required: false, default: 'https://www.freeiconspng.com/uploads/orange-question-mark-icon-png-clip-art-30.png'},  
})

module.exports = mongoose.model('Product', ProductSchema, 'products')
 
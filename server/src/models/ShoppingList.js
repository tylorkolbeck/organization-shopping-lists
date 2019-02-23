const mongoose = require('mongoose')

const ShoppingListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cartName: {type: String, required: true},
    items: {type: Object, required: false}
})


module.exports = mongoose.model('carts', ShoppingListSchema, 'carts')

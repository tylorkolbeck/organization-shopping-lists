ShoppingList = require('../models/ShoppingList')
Products = require('../models/Product')

exports.shoppingListGetAll = (req, res, next) => {
    ShoppingList.find()
        .select()
        .exec()
        .then(carts => {
            res.status(200).json({
                message: `Total Carts ${carts.length}`,
                carts: carts.map(cart => {
                    return cart
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Something went wrong'
            })
        })
}

exports.shoppingListGetListNames = (req, res, next) => {
    ShoppingList.find()
        .select("cartName _id")
        .exec()
        .then(carts => {
            res.status(200).json({
                message: `All carts`,
                carts: carts.map(cart => {
                    let cartInfo = {}
                    cartInfo.name = cart.cartName
                    cartInfo.id = cart._id
                    return cartInfo
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Something went wrong'
            })
        })
}

exports.getShoppingList = (req, res, next) => {
    const cartId = req.params.cartId

    // Find all items in the product database that match the id of each item in the cart
    ShoppingList.findById(cartId)
    
        .exec((err, results) => {
            let cartResult = results
            let ids = results.items.map((el)=>{
                return el.productId})
            Products.find({"_id": {"$in": ids}}, (err, databaseItems) => {
                // cartResult @object - Object holding all the cart
                    // items @array
                        // @object
                            // productId
                
                // databaseItems @array - Array holding all the products from the database that are in the cart
                    // @object
                        // _id @string

                // Once all the products are found add that product info to the cart item 
                try {
                    let findProductInDatabase = (cartProductId) => {
                        let foundProduct;
                        try {
                            if (cartProductId) {
                                cartProductId = cartProductId.toString()
                                foundProduct = databaseItems.find((pro) => pro._id == cartProductId)
                            } else {
                                return 'A product id was not given.'
                            }
                            if (foundProduct) return foundProduct
                            else if (!foundProduct) return `That product was not found in the database with the given ID ${cartProductId}`
        
                            return foundProduct
                        } catch(err) {
                            foundProduct = 'An error has occured.'
                            return foundProduct
                        } 
                    }

                    mergeProductInfo = (cartItems) => {
                    let newCartProducts = []
                        for (let i = 0; i < cartItems.length; i++) {
                            let productObj = {}
                            // assign product info to product
                            productObj.product = findProductInDatabase(cartResult.items[i].productId)
                            productObj.inCart = cartResult.items[i].quantity
                            newCartProducts.push(productObj)                    
                        }
                        // replace current cartItems with new cart items that hold the productinfo
                        cartResult.items = newCartProducts
                    }
                    mergeProductInfo(cartResult.items)
                } catch(err) {
                    return err
                }

             })
                .then(() => {
                    res.status(200).json({
                        message: 'Found cart',
                        cart: cartResult,
                        
                    })
                    // console.log('------------------------')
                    console.log(cartResult)
                })
                .catch(err => {
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong'
                    })
                })
        })
}
import React, { Component } from 'react'
import axios from 'axios'
// import Product from '../../Components/Product/Product'
import CartItem from '../../Components/CartItem/CartItem'
import { formatMoney } from 'accounting-js'
import './Cart.css'



class Cart extends Component {
    state = {
        cart: false,
        cartName: false,
        items: false,
        loading: false,
        error: false,
        totalPrice: 0
    }

    componentDidMount() {
        // Get the cart from the mongo database
        this.setState({loading: true})
        axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/' + this.props.match.params.cartId)
            .then(response => {
                if (response.data.itemsInCart) {
                    this.setState({
                        cart: response.data.cart._id, 
                        items: response.data.cart.items, 
                        cartName: response.data.cart.cartName,
                        itemsInCart: true,
                        loading: false
                    })
                } else if (!response.data.itemsInCart) {
                    this.setState({
                        loading: false,
                        itemsInCart: false,
                        cartName: response.data.cart.cartName
                    },
                    () => {
                        console.log(this.state.itemsInCart)
                    })
                }
            })
            .then(() => {
                this.getTotalPrice()
            }

            )
            .catch(err => {
                this.setState({error: err, loading: false})
            })
    }

    getTotalPrice() {
        let totalPrice = 0
        this.state.items.forEach((item) => {
            totalPrice += item.product.price * item.inCart      
        })
        this.setState({totalPrice})
    }

    removeItemFromCartHandler(id) {
        axios.delete(process.env.REACT_APP_MONGODB + '/shoppingLists/delete/', 
        { data: 
            { 
                cartId:  this.state.cart,
                productId: id
            }
        })
        .then(()=> {
            this.getTotalPrice()
        })
        

        // Do this after confirmed that it was removed from the cart
        let oldItems = {...this.state.items}
        oldItems = this.state.items.filter((item) => item.product._id !== id)

        this.setState({
            items: oldItems,
            // itemsInCart: this.state.items.length == 0 ? false : true
        })
    }

    updateQuantityInCartaHandler(cart, product, inCart) {
        axios.patch(process.env.REACT_APP_MONGODB + '/shoppingLists/updateQuantity', {
            data: {
                cartId: cart,
                productId: product,
                quantity: inCart
            }
        })
        let oldItems = this.state.items.filter((item) => item.product._id !== product)
        // console.log(oldItems)
        let itemToUpdate = this.state.items.find(item => item.product._id === product)
        // console.log(itemToUpdate)
        itemToUpdate.inCart = inCart
        // console.log(itemToUpdate)
        oldItems = {...oldItems, ...itemToUpdate}
        console.log(oldItems)

        this.getTotalPrice()

    }

    render() {
        let products = null
        if (this.state.loading) {
            products= <p>Loading Cart...</p>
        }
        
        if (this.state.items) {          
    
            products = (
                this.state.items.map(item => (
                    <div key={item.product._id}>

                        <CartItem 
                            id={item.product._id}
                            name={item.product.product}
                            price={item.product.price}
                            imgUrl={item.product.imgUrl}
                            inCart={item.inCart}
                            cartId={this.state.cart}
                            removeItem={this.removeItemFromCartHandler.bind(this)}
                            updateQuantity={this.updateQuantityInCartaHandler.bind(this)}
                        />
                    </div>
                ))
            )
        } 
        else if (!this.state.itemsInCart) {
            products = (
                <div>
                    <p>No items in this cart.</p>
                </div>
            )
        }
        
        return (
            <div className="Cart__container">
                <h2 className="Cart__cart_name">{this.state.cartName} - <span className="Cart__total_price">{formatMoney(this.state.totalPrice)} </span></h2>
                {products}
                <h2 className="Cart__final_total">Total - <span className="Cart__total_price">{formatMoney(this.state.totalPrice)} </span></h2>
            </div>
        )
    }
}

export default Cart
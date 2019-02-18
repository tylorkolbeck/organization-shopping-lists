import React, { Component } from 'react'
import axios from 'axios'
// import Product from '../../Components/Product/Product'
import CartItem from '../../Components/CartItem/CartItem'
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
                this.setState({
                    cart: response.data.cart._id, 
                    items: response.data.cart.items, 
                    cartName: response.data.cart.cartName,
                    loading: false
                })
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
        // console.log(this.state.items)
        let totalPrice = 0
        this.state.items.forEach((item) => {
            totalPrice += item.product.price * item.inCart      
        })
        this.setState({totalPrice})
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
                        />
                    </div>
                ))
            )
        }
        
        return (
            <div className="Cart__container">
                <h2 className="Cart__cart_name">{this.state.cartName} - <span className="Cart__total_price">{this.state.totalPrice} </span></h2>
                {/* {cartInfo} */}
                {products}
                <h2 className="Cart__final_total">Total - <span className="Cart__total_price">{this.state.totalPrice} </span></h2>
            </div>
        )
    }
}

export default Cart
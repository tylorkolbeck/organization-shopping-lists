import React, { Component } from 'react'
import axios from 'axios'


class Cart extends Component {
    state = {
        cart: false,
        cartName: false,
        items: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/' + this.props.match.params.cartId)
            .then(response => {
                console.log(response.data.cart)
                this.setState({
                    cart: response.data.cart._id, 
                    items: response.data.cart.items, 
                    cartName: response.data.cart.cartName})
            })
            .catch(err => {
                this.setState({error: err})
            })
    }

    render() {
        let cartInfo = <p>Loading Cart...</p>
        if (this.state.cart) {
           console.log(this.state.items)
          
            cartInfo = (
                <div>
                    <p><b>Cart Name: </b>{this.state.cartName}</p>
                    <p><b>Cart Id: </b>{this.state.cart}</p>
                    <b>Items:</b> {this.state.items.map(item => (<p key={item.productId}>{item.productId} - {item.quantity}</p>))}
                </div>
                
            )
        }
        

        return (
            <div>
                {cartInfo}
            </div>
            
        )
    }
}

export default Cart
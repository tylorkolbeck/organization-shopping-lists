import React, { Component } from 'react'
import './CartItem.css'
import CartButtons from '../Buttons/CartButtons/CartButtons'
import DeleteButton from '../Buttons/DeleteButton/DeleteButton'


class CartItem extends Component {

    state = {
        loading: false,
        inCart: this.props.inCart ? this.props.inCart : 1 
    }

    incrementQuantity() {
        let inCart = this.state.inCart
        inCart++ 
        this.setState({inCart})
      }
    
    decrementQuantity() {
        let inCart = this.state.inCart
        inCart = inCart > 1 ? inCart-=1 : 1
        this.setState({inCart})
    }

    updateQuantityInCartaHandler(cart, product, inCart) {
        console.log('CART ID', cart)
        console.log('PRODUCTUCTID', product)
        console.log('NEW AMOUNT', this.state.inCart)
    }


    render() {
        return (
            <div className="CartItem__container">
            <div className="CartItem__img_button">
                <img src={this.props.imgUrl} alt={this.props.name}></img>

                <CartButtons 
                    buttonWord="Update" quantity={this.state.inCart}
                    decrementQuantity={this.decrementQuantity.bind(this)}
                    incrementQuantity={this.incrementQuantity.bind(this)}
                    clicked={() => this.updateQuantityInCartaHandler(this.props.cartId, this.props.id, this.state.inCart)}/>

            </div>
            <div className="CartItem__product_info">
                <h2>{this.props.name}</h2>
                <h3>${this.props.inCart * this.props.price}</h3>
                <p>${this.props.price} each</p>
                <DeleteButton 
                    removeItem={() => this.props.removeItem(this.props.id)}
                />
            </div>
           
       
        </div>
        )
        }
}

export default CartItem

// key={item.product._id}
// id={item.product._id}
// name={item.product.product}
// price={item.product.price}
// imgUrl={item.product.imgUrl}
// inCart={item.inCart}
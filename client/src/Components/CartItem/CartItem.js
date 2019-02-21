import React, { Component } from 'react'
import './CartItem.css'
import CartButtons from '../Buttons/CartButtons/CartButtons'
import DeleteButton from '../Buttons/DeleteButton/DeleteButton'


class CartItem extends Component {

    state = {
        loading: false,
        inCart: this.props.inCart ? this.props.inCart : 1, 
        oldQuantity: this.props.inCart,
        udpatedInCart: true
    }

    componentDidMount() {
        this.setState({oldQuantity: this.props.inCart}, () => {
            console.log('OLD QUANTITY:', this.state.oldQuantity)
        })
        
    }

    incrementQuantity() {
        let inCart = this.state.inCart
        inCart++ 
        this.setState({inCart}, () => {
            // See if a change was not submitted
            if (this.props.inCart !== this.state.inCart ) {
                this.setState({udpatedInCart: false})
            } else {
                this.setState({udpatedInCart: true})
            }
        })
      }
    
    decrementQuantity() {
        let inCart = this.state.inCart
        inCart = inCart > 1 ? inCart-=1 : 1
        this.setState({inCart}, () => {
            // See if a change was not submitted
            if (this.props.inCart !== this.state.inCart ) {
                this.setState({udpatedInCart: false})
            } else {
                this.setState({udpatedInCart: true})
            }
        })
    }

    render() {
        return (
            <div className="CartItem__container">
            <div className="CartItem__img_button">
                <img src={this.props.imgUrl} alt={this.props.name}></img>

                <CartButtons 
                    buttonWord="Update" 
                    quantity={this.state.inCart}
                    decrementQuantity={this.decrementQuantity.bind(this)}
                    incrementQuantity={this.incrementQuantity.bind(this)}
                    addedToCart={this.state.udpatedInCart}
                    clicked={() => {
                        this.setState({udpatedInCart: true}) 
                        this.props.updateQuantity(this.props.cartId, this.props.id, this.state.inCart)
                    }}
                    resetUpdate={this.resetUpdateRequiredHandler}
                />

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

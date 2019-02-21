import React, { Component }from 'react'
import CartButtons from '../../Components/Buttons/CartButtons/CartButtons'
import './Product.css'
import axios from 'axios'
import { connect } from 'react-redux'

// import { formatMoney } from 'accounting-js'

class Product extends Component {
  state = {
    quantity: this.props.inCart ? this.props.inCart : 1,
    addedToCart: true,
  }

  componentDidMount() {
    console.log('ACTIVE CARTs', this.props.activeCarts)
  }

  incrementQuantity() {
    let quantity = this.state.quantity
    quantity++ 
    this.setState({quantity, addedToCart: false})
    this.checkIfAddedToCart()
  }

  decrementQuantity() {
    let quantity = this.state.quantity
    quantity = quantity > 1 ? quantity-=1 : 1
    if (quantity === 1) {
      this.setState({addedToCart: true})

    }
    this.setState({quantity})
  }

  checkIfAddedToCart() {
    if (this.state.quantity !== 1 & !this.state.addedToCart) {
    }
  }

  addProductToCarthandler(prodId, quantity) {
    // Gather the payload to be sent
    const cartData = {
      activeCarts: this.props.activeCarts,
      productInfo: {
        productId: prodId,
        quantity: quantity
      }
    }

    if (this.props.activeCarts.length > 0) {
      // Make a patch request
      axios({
        method: 'PATCH',
        url: process.env.REACT_APP_MONGODB + '/shoppingLists/addToCart',
        data: cartData
      })
      .then(res =>
        console.log(res)
      )
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
      } else {
        alert('You do not have a cart selected.')
        return
      }
      // reset cart quantity and red buttons for unsaved cart additions
      this.setState({addedToCart: true})
      this.setState({quantity: 1})
    } 
    

  render() {
    return (
      <div className="Product">
      <div className="Product__product_details">
        <img src={this.props.imgUrl} alt={this.props.name}></img>
        <h2>{this.props.name} {this.props.countPerPackage}-Count</h2>
        <p>${this.props.price}</p>
      </div>
      
      <CartButtons 
        decrementQuantity={this.decrementQuantity.bind(this)}
        incrementQuantity={this.incrementQuantity.bind(this)}
        quantity={this.state.quantity}
        buttonWord="Add"
        id={this.props.id}
        clicked={this.addProductToCarthandler.bind(this)}
        addedToCart={this.state.addedToCart}
      />

      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    activeCarts: state.activeCarts
  }
}

export default connect(mapStateToProps)(Product)


import React, { Component }from 'react'
import CartButtons from '../../Components/Buttons/CartButtons/CartButtons'
import './Product.css'

// import { formatMoney } from 'accounting-js'

class Product extends Component {
  state = {
    quantity: 1,
    addedToCart: false
  }

  incrementQuantity() {
    let quantity = this.state.quantity
    quantity++ 
    this.setState({quantity})
  }

  decrementQuantity() {
    let quantity = this.state.quantity
    quantity = quantity > 1 ? quantity-=1 : 1
    this.setState({quantity})
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
      />

      </div>
    )
  }
  
}

export default Product


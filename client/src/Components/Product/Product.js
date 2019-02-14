import React from 'react'
import './Product.css'
import { formatMoney } from 'accounting-js'

const Product = props => (
  <div className="Product">
    <img src={props.imgUrl} alt={props.name}></img>
    <h2>{props.name} {props.countPerPackage}-Count</h2>
    {/* <p>Product ID: {props.id}</p> */}
    <p>${props.price}</p>
    {/* <p>Price Per Count: {formatMoney(props.pricePerPackage)}</p> */}
    {/* <p>Count: {props.countPerPackage}</p> */}
    {/* <p>Selling Price: {formatMoney(props.sellingPrice)}</p> */}

  </div>
)

export default Product


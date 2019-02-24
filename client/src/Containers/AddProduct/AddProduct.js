import React, { Component } from 'react'
import axios from 'axios'
import './AddProduct.css'

class AddProduct extends Component {

    state = {
        product: false,
        quantity: false,
        countPerPackage: false,
        price: false,
        pricePerPackage: false,
        sellingPrice: false,
        imgUrl: false
    }

    render() {
        let addProductContent = null
        if (this.props.loading) {
           addProductContent = (
            <div>
                <p>Adding Product...</p>
            </div>
           )
        } else {
            addProductContent = (
                <form className="AddProduct__form" onSubmit={(e) => this.props.addProduct(e, this.state)}>
                    <p>Add a New Product:</p>
                    <span>Product Name:</span>
                        <input 
                            type="text" 
                            onChange={(e) => this.setState({product: e.target.value})}>
                        </input>

                    <span>Number In Package:</span>
                        <input 
                            type="text" 
                            onChange={(e) => this.setState({countPerPackage: e.target.value})}>
                        </input>

                    <span>Price:</span>
                        <input 
                            type="text" 
                            onChange={(e) => this.setState({price: e.target.value})}>
                        </input>

                    <span>Selling Price:</span>
                        <input 
                            type="text" 
                            onChange={(e) => this.setState({sellingPrice: e.target.value})}>
                        </input>

                    <span>Image Url:</span>
                        <input 
                            type="text" 
                            onChange={(e) => this.setState({imgUrl: e.target.value})}>
                        </input>
                        
                    <button>Add</button>
                </form>
            )
        }
        return (
            <div>
                {addProductContent}
            </div>
        )
    }
}

export default AddProduct
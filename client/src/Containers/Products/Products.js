import React, { Component } from 'react'
import Product from '../../Components/Product/Product'
import axios from 'axios'

class Products extends Component {
    state = {
        loading: false,
        products: false
    }
    componentDidMount() {
        if (!this.state.products) {
            this.setState({loading: true})
            axios.get(process.env.REACT_APP_MONGODB + '/products')
                .then((response) => {
                    this.setState({products: response.data.products})
                    this.setState({loading: false})
                    console.log(this.state.products)
                })
        }
    }


    render() {
        let loading = this.state.loading ? "Fetching Products" : null

        let products = null

        if (this.state.products) {
            products = this.state.products.map(prd => {
                return ( 
                    <Product 
                        key={prd._id}
                        id={prd._id}
                        name={prd.product}
                        price={prd.price}
                        imgUrl={prd.imgUrl}
                        pricePerPackage={prd.pricePerPackage}
                        quantity={prd.quantity}
                        sellingPrice={prd.sellingPrice}
                        countPerPackage={prd.countPerPackage}
                    />
                )
                
            })
        }

        return (
            <div className="Product__container">
                {products}
                {loading}
            </div>
          
        )
        
    }
}

export default Products
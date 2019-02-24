import React, { Component } from 'react'
import Product from '../../Components/Product/Product'
import axios from 'axios'
import './Products.css'

class Products extends Component {
    state = {
        loading: false,
        products: false,
        searchPhrase: ''
    }
    componentDidMount() {
        if (!this.state.products) {
            this.getProducts()
        }
    }

    getProducts() {
        this.setState({loading: true})
        axios.get(process.env.REACT_APP_MONGODB + '/products')
            .then((response) => {
                this.setState({products: response.data.products})
                this.setState({loading: false})
            })
    }

    searchProducts(e) {
        e.preventDefault()
        console.log(this.state.searchPhrase.length)
        if (this.state.searchPhrase.length) {
            axios.get(process.env.REACT_APP_MONGODB + '/products/search/' + this.state.searchPhrase)
                .then((result) => {
                    console.log(result.data.products)
                    this.setState({products: result.data.products})
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log('Not searching')
            this.getProducts()
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
            <div>
                <div className="Products__search_container">
                    <form onSubmit={this.searchProducts.bind(this)}>
                        <input 
                            type="text" 
                            placeholder="Search Products" 
                            className="Products__product_search"
                            onChange={(e) => this.setState({searchPhrase: e.target.value})}
                            ></input>
                        <button className="Products__search_btn">Search </button>
                    </form>
                </div>
                
                
                
                <div className="Product__container">
                    {products}
                    {loading}
                 </div>

            </div>
           
          
        )
        
    }
}

export default Products
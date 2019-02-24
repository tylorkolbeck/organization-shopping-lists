import React, { Component } from 'react'
import Product from '../../Components/Product/Product'
import axios from 'axios'
import './Products.css'
import AddProduct from '../AddProduct/AddProduct'

class Products extends Component {
    state = {
        loading: false,
        error: false,
        products: false,
        searchPhrase: '',
        addingProduct: false,
        addingProductLoading: false
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
        if (this.state.searchPhrase.length) {
            axios.get(process.env.REACT_APP_MONGODB + '/products/search/' + this.state.searchPhrase)
                .then((result) => {
                    this.setState({products: result.data.products})
                })
                .catch((error) => {
                    this.setState({error: error})
                })
        } else {
            this.getProducts()
        }
    }

    toggleAddProduct(e) {
        e.preventDefault()
        this.setState({addingProduct: !this.state.addingProduct})
    }

    addProductToHandler(e, productInfo) {
        e.preventDefault()
        this.setState({addingProductLoading: true})

        axios.post(process.env.REACT_APP_MONGODB + '/products/addProduct', {
            ...productInfo
        })
            .then(() => {
                this.setState({addingProductLoading: false, addingProduct: false})
                this.getProducts()
            }
                
            )        
    }


    render() {
        let addProductView = null

        addProductView = this.state.addingProduct ? <AddProduct loading={this.state.addingProductLoading} addProduct={this.addProductToHandler.bind(this)}/> : null
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

                    <button className="AddProduct__toggle_add_product_button" onClick={this.toggleAddProduct.bind(this)}>Add A Product</button>

                    {addProductView}
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
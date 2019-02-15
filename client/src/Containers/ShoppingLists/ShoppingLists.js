import React, { Component } from 'react'
import axios from 'axios'
import CartsNav from '../../Components/CartsNav/CartsNav'

class shoppingLists extends Component {
    state = {
        carts: false,
        loading: false
    }

    componentDidMount() {
        console.log('LIST COMPONENT')
        console.log(this.props)
        if (!this.state.products) {
            this.setState({loading: true})
            axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/cartNames')
                .then(response => {
                    this.setState({carts: response.data.carts, loading: false})
                })
        }
    }

    gotToCart() {

    }

    render() {
        let cartLinks = <li>Loading Carts...</li>

        if (this.state.carts) {
            cartLinks = this.state.carts.map(cart => {
                return (
                    <CartsNav 
                        key={cart.id}
                        name={cart.name}
                        id={cart.id}
                        location={this.props.location}
                    />
                )
            })
        }

        return (
            <div className="CartsNav__container">
                <ul>
                    {cartLinks}
                </ul>
                
            </div>
        )
    }
}

export default shoppingLists

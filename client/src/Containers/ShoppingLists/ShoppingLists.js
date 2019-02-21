/*
This gets the names of all the current shopping lists from 
the carts collection in the database. All the names are put into 
a CartsNav component to make a shopping lists navigation.
*/

import React, { Component } from 'react'
import axios from 'axios'
import CartsNav from '../../Components/CartsNav/CartsNav'


class shoppingLists extends Component {
    state = {
        carts: false,
        loading: false,
        activeCarts: []
    }

    componentDidMount() {
        if (!this.state.products) {
            this.setState({loading: true})
            axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/cartNames')
                .then(response => {
                    this.setState({carts: response.data.carts, loading: false})
                })
        }
    }

    render() {
        let cartLinks = <li>Loading Carts...</li>

        if (this.state.carts) {
            cartLinks = this.state.carts.map(cart => {
                return (
                    <div key={cart.id}>
                        <CartsNav 
                            name={cart.name}
                            id={cart.id}
                            location={this.props.location}
                        />
                    </div>                    
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

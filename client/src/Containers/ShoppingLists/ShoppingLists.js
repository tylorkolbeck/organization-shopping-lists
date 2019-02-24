/*
This gets the names of all the current shopping lists from 
the carts collection in the database. All the names are put into 
a CartsNav component to make a shopping lists navigation.
*/

import React, { Component } from 'react'
import CartsNav from '../../Components/CartsNav/CartsNav'

import './ShoppingLists.css'


class shoppingLists extends Component {
    state = {
        carts: false,
        loading: false,
        activeCarts: []
    }

    render() {
        let cartLinks = null

        if (this.props.carts) {
            cartLinks = this.props.carts.map(cart => {
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

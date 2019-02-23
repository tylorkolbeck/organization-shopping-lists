/*
This gets the names of all the current shopping lists from 
the carts collection in the database. All the names are put into 
a CartsNav component to make a shopping lists navigation.
*/

import React, { Component } from 'react'
import axios from 'axios'
import CartsNav from '../../Components/CartsNav/CartsNav'
// import { Link } from 'react-router-dom'

import './ShoppingLists.css'


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
        let cartLinks = null

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
        
        // TODO:
        // if (this.state.carts) {
        //     cartLinks = 
        //     this.state.carts.map(cart => {
        //         return (
        //             <option value={cart.id} key={cart.id}>{cart.name}</option>                
        //         )
        //     })
        // }

        return (
            // TODO:
            // <div className="CartsNav__container">
                // <div className="styled" onChange={console.log(this.state.activeCarts)}>
                //     <select>
                //             {cartLinks}
                //     </select>
                // </div>
            // </div>

            <div className="CartsNav__container">
                <ul>
                    {cartLinks}
                    {/* <li className="ShoppingLists__edit_carts">
                        <Link to={`/editCarts`}>Edit Carts</Link>
                        <Link to={`/editCarts`}>Edit Carts</Link>
                    </li> */}
                </ul>


            </div>
        )
    }
}



export default shoppingLists

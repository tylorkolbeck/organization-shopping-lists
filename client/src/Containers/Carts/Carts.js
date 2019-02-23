import React, { Component } from 'react'
import axios from 'axios'
import './Carts.css'
import TrashCan from '../../assets/images/trashcan.png'
import AddIcon from '../../assets/images/add_icon.ico'


class Carts extends Component {
    state = {
        carts: false
    }

    componentDidMount() {
        if (!this.state.REACT_APP_MONGODBcarts) {
            axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/')
                .then(response => {
                    this.setState({carts: response.data.carts, loading: false}, () => {
                        console.log(this.state.carts)
                    })
                })
        }
        
    }

   


    render() {

        let cartData = null

        if (this.state.carts) {
            cartData = this.state.carts.map((cart)=> {
                return (
                    <tr key={cart._id}>
                        <td>{cart.cartName}</td>
                        <td>{cart.items.length}</td>
                        <td>$0.00</td>
                        <td><img src={TrashCan} alt="trahscan" className="Carts__trash_can"></img></td>
                    </tr>
                    // <p key={cart._id}>Cart: {cart.cartName} Items: {cart.items.length} Total: </p>
                )
            })
        }



        return (
            <div className="Carts__container">
                <h2>Cart Management</h2>
                
                <table className="Carts__carts_table">
                    <tbody>
                        <tr>
                            <th>Cart</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                        {cartData}
                        <tr>
                            <td className="Carts__new_cart">
                                <input type="text" placeholder="New Cart"></input>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>{<img src={AddIcon} alt="Add" className="Carts__add_icon"></img>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    
}

export default Carts
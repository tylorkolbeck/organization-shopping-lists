import React, { Component } from 'react'
import axios from 'axios'
import './Carts.css'
import TrashCan from '../../assets/images/trashcan.png'
import AddIcon from '../../assets/images/add_icon.ico'


class Carts extends Component {
    state = {
        carts: false,
        newCartName: ''
    }

    componentDidMount() {
        if (!this.state.carts) {
            this.getCarts()
        }
    }
    
    getCarts() {
        axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/')
        .then(response => {
            this.setState({carts: response.data.carts, loading: false})
        })
    }

    addCartToDatabase(e) {
        axios.post(process.env.REACT_APP_MONGODB + '/shoppingLists/addCart', {
            cartName: this.state.newCartName
        })
            .then(()=> {
                this.props.updateCarts()
                this.getCarts()
                this.setState({newCartName: ''})
            })
    }

    removeCartFromDatabase(e) {
        console.log('REMOVING CART FROM DATABASE', e.target.id)
        axios.delete(process.env.REACT_APP_MONGODB + '/shoppingLists/removeCart/' + e.target.id)
            .then((error, result) => {
                this.getCarts()
                this.props.updateCarts()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        let cartData = null

        if (this.state.carts) {
            cartData = this.state.carts.map((cart)=> {
                return (
                    <tr key={cart._id}>
                        <td>{cart.cartName}</td>
                        <td>{cart.items ? cart.items.length : 0}</td>
                        <td>$0.00</td>
                        <td><img id={cart._id} src={TrashCan} alt="trahscan" className="Carts__trash_can" onClick={(e) => this.removeCartFromDatabase(e)}></img></td>
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
                                <input type="text" placeholder={"New Cart"} value={this.state.newCartName} onChange={(e) => this.setState({newCartName: e.target.value})}></input>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>{<img src={AddIcon} alt="Add" className="Carts__add_icon" onClick={(e) => this.addCartToDatabase(e)}></img>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    
}

export default Carts
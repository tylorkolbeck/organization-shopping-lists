import React, { Component } from 'react'
import './CartsNav.css'
import { Link } from 'react-router-dom'

class CartsNav extends Component {
    state = {
        active: false
    }

    activeCartHandler() {
        let currentState = !this.state.active
        this.setState({active: currentState}, async () => {
            try {
                await console.log(this.props.name, this.state.active)
            } catch(error) {
                console.log(error)
            }
            
        })
        

    }

    render() {
        return (
            <div className="CartsNav__container" >
                <li key={this.props.id}>
                    <div className={`CartsNav__active_list ${this.state.active === true ? "CartNav__active_cart" : ""}`} onClick={this.activeCartHandler.bind(this)}></div>
                    <Link to={`/shoppingLists/${this.props.id}`}>{this.props.name}</Link>
                </li>
             </div>
        )
    }
    
}

export default CartsNav
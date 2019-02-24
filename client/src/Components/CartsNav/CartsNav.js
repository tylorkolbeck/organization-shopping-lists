import React, { Component } from 'react'
import './CartsNav.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class CartsNav extends Component {
    state = {
        active: false,
        activeCarts: this.props.activeCarts,
        loading: true
    }

    componentDidMount() {
        this.setState({loading: false})
        this.checkIfActive()
    }

    componentDidUpdate() {
        if (!this.state.loading) {
            if (this.state.activeCarts !== this.props.activeCarts) {
                this.setState({activeCarts: this.props.activeCarts})
                this.checkIfActive()
            }
        }
    }

    checkIfActive() {
        /*
            if the component state has the activeCarts array from 
            redux then determine if the active state needs to be checked or not for 
            this instance of the cartList component.
        */
        if (this.props.activeCarts) {
            if (this.props.activeCarts.includes(this.props.id)) {
                this.setState({active: true})
            } else {
                this.setState({active: false})
            }
        }
        
        
    }

    render() {
        return (
            <div>
                <li key={this.props.id}>
                    <div 
                        className={`CartsNav__active_list ${this.state.active === true ? "CartNav__active_cart" : ""}`} 
                        onClick={() => this.props.toggleActiveHandler(this.props.id)}></div>
                    <Link to={`/shoppingLists/${this.props.id}`}>{this.props.name}</Link>
                </li>
             </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeCarts: state.activeCarts,
        carts: state.carts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleActiveHandler: (cartId) => dispatch({type: "TOGGLE_ACTIVE_CART", cartId: cartId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartsNav)
import React from 'react'
import './CartButtons.css'

const cartButtons = (props) =>{
    let unsavedChanges = !props.addedToCart ? "cartButtons__unsaved" : ""

    return (
        <div className="cartButtons__cart_buttons">
            <div className="cartButtons__cart_button" onClick={props.decrementQuantity}><span>-</span></div>
            <input type="text" maxLength="3" placeholder={props.quantity} className="cartButtons__number_input"></input>
            <div className="cartButtons__cart_button" onClick={props.incrementQuantity}>+</div>
            <button className={`cartButtons__cart_add ${unsavedChanges}`} onClick={() => props.clicked(props.id, props.quantity)}>{props.buttonWord}</button>
        </div>
    )
} 
    


export default cartButtons
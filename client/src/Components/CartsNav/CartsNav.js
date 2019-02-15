import React from 'react'
import './CartsNav.css'
import { Link } from 'react-router-dom'

const CartsNav = (props) => (
    <div className="CartsNav__container">
            <li key={props.id}><Link to={`/shoppingLists/${props.id}`}>{props.name}</Link></li>
    </div>
)

export default CartsNav
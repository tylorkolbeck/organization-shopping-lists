import React from 'react'
import './DeleteButton.css'

const DeleteButton = (props) => {
    return (
        <div className="DeleteButton__container" onClick={props.removeItem}>
            <div>Remove</div>
        </div>
    )
}

export default DeleteButton
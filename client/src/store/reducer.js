/*
 @Array - activeCarts - an array containg which carts are active for adding items to. 
*/

import axios from 'axios'

const initialState = {
    activeCarts: [],
    carts: false,
    loadingCarts: false
    // TODO: Add user functionality to lock the app down
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_ACTIVE_CART":
            if (action.cartId !== state.activeCarts[0]) {
                let newActiveCart = []
                newActiveCart.push(action.cartId)
                state = {
                    ...state,
                    activeCarts: newActiveCart
                }
            } else {
                state = {
                    ...state,
                    activeCarts: []
                }
            }
            

            // TODO: In the future if I want to be able to add items to multiple
            // carts at once just turn this on and set up the backend to loop through all
            // acrtive carts when adding items to them.


            // if (state.activeCarts.includes(action.cartId)) {
            //     let activeCarts = [...state.activeCarts]
            //     let index = activeCarts.indexOf(action.cartId)
            //     activeCarts.splice(index,1)
                
            //     state = {
            //         ...state,
            //         activeCarts: activeCarts
            //     }
            // } else {
            //     state = {
            //         ...state,
            //         activeCarts: [...state.activeCarts, action.cartId]
            //     }
            // }
            break

        case "GET_CARTS":
            console.log('GETTING CARTS')

            axios.get(process.env.REACT_APP_MONGODB + '/shoppingLists/cartNames')
                state = {
                    ...state,
                    loadingCarts: true
                }
                .then(response => {
                    let carts = response.data.carts
                    
                    state = {
                        ...state,
                        loadingCarts: false,
                        carts: carts
                    }
                    console.log(state)
            })
            
        




            break
        default:
            return state
    }

    return state
}
export default reducer

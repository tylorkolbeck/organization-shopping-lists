/*
 @Array - activeCarts - an array containg which carts are active for adding items to. 
*/

const initialState = {
    activeCarts: [],
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
            console.log('[ACTIVE CART/s]', state.activeCarts)
            break
        case "SOMETHING_ELSE":
            console.log('SOMETHINGELSE')
            break
        default:
            return state
    }

    return state
}
export default reducer

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
            if (state.activeCarts.includes(action.cartId)) {
                let activeCarts = [...state.activeCarts]
                let index = activeCarts.indexOf(action.cartId)
                activeCarts.splice(index,1)
                
                state = {
                    ...state,
                    activeCarts: activeCarts
                }
            } else {
                state = {
                    ...state,
                    activeCarts: [...state.activeCarts, action.cartId]
                }
            }
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

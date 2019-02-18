const initialState = {
    activeCarts: ['5c665676f703330bccf0bf47', '5c66585ce520a80bcca2ae2c'],
    counter: 0
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
            break
        case "SOMETHING_ELSE":
            console.log('SOMETHINGELSE')
            break
        default:
            return state
    }
    // console.log(state)
    return state
}
        // if (state.activeCarts.includes(action.cartId)) {
        //     let newActiveCarts = state.activeCarts.slice()
        //     let index = newActiveCarts.indexOf(action.cartId)
        //     newActiveCarts.splice(index, 1)

        //     // newActiveCarts = state.activeCarts.filter((value) => {
        //     //     return value !== action.cartId
        //     // })
        //     console.log(newActiveCarts)
        //     return {
        //         ...state,
        //         activeCarts: newActiveCarts
        //     }
        //} else {
        //     newActiveCarts = [...state.activeCarts, action.cartId]
        //     console.log(state.activeCarts)
        //     return {
        //         ...state,
        //         activeCarts: newActiveCarts
        //     }
        // }
    // }
    // return state


export default reducer


// let currentState = !this.state.active
//         this.setState({active: currentState}, async () => {
//             try {
//                 await console.log(this.props.name, this.state.active)
//             } catch(error) {
//                 console.log(error)
//             }
//         })
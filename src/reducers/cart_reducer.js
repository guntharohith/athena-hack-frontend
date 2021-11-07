function CartReducer(state,action){
   
    if(action.type === "CART_LOADING_BEGIN"){
        return {...state,cart_loading:true,cart_error:false}
    }
    if(action.type === "CART_LOADING_SUCCESS"){
        return {...state,cartItems:action.payload,
        numberOfItems:calculateTotalNumber(action.payload),total_amount:calculateTotal(action.payload),cart_loading:false,cart_error:false}
    }
    if(action.type === "CART_LOADING_ERROR"){
        return { ...state, cart_loading: false, cart_error: true}
    }

    if (action.type === "ADD_TO_CART"){

        return {...state,cartItems:[...state.cartItems,action.payload],numberOfItems:state.numberOfItems+action.payload.quantity,
            total_amount:state.total_amount+(action.payload.price * action.payload.quantity)}
    }

    if (action.type === "TOGGLE_AMOUNT"){
        const {id,quantity} = action.payload
        const tempCart = state.cartItems.map((item) =>{
            if(item.cartId === id){
                return {...item,quantity:quantity}
            }
            return item
        })
        return {...state,cartItems:tempCart,numberOfItems:calculateTotalNumber(tempCart),total_amount:calculateTotal(tempCart)}
        
    }
    if(action.type === "REMOVE_CART_ITEM"){
        const tempCart = state.cartItems.filter((item) => item.cartId !== action.payload)
        return {...state,cartItems:tempCart,numberOfItems:calculateTotalNumber(tempCart),total_amount:calculateTotal(tempCart)}
    }
    if(action.type === "CLEAR_CART"){
        return {...state,cartItems:[],numberOfItems:0,total_amount:0}
    }
    return state
}

function calculateTotal(arr){
    let res = 0
    arr.map((item) => {
        res += item.price * item.quantity
        return item
    })
    return res
}

function calculateTotalNumber(arr){
    let res = 0
    arr.map((item) => {
        res += item.quantity
        return item
    })
    return res
}

export default CartReducer
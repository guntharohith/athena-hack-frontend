import React, {useContext,useEffect,useReducer} from "react"
import CartReducer from "../reducers/cart_reducer"
import axios from "axios"
import { url } from "../utils/constants"
const CartContext = React.createContext()
const token = localStorage.getItem("token")
const initialState = {
    cartItems:[],
    numberOfItems:0,
    total_amount:0,
    cart_loading:true,
    cart_error:false
}

function CartProvider({children}){
    const[state,dispatch] = useReducer(CartReducer,initialState)

    async function fetchCartItems(url){
        dispatch({type:"CART_LOADING_BEGIN"})
        try{
            const res = await axios.get(url + "get-cart", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            dispatch({ type: "CART_LOADING_SUCCESS", payload: res.data })
        }
        catch(error){
            dispatch({type:"CART_LOADING_ERROR"})
        }
    }

    useEffect(() => {
        token !== "" && fetchCartItems(url)
    },[])

    
    function addToCart(color,amount,product){
        axios.post(url + "add-cart", { name: product.name, color: color, image: product.images[0].imageUrl, price: product.price, quantity: amount }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => dispatch({ type: "ADD_TO_CART", payload: res.data })) 
    }

    function toggleAmount(id,incOrDec,quantity){
        if(incOrDec === "inc"){
            quantity++;
        }
        else if(incOrDec === "dec"){
            quantity -= 1
            if(quantity < 1){
                quantity = 1
            }
        }
        axios.put(url + "update-cart/" + id,{quantity:quantity},{
            headers:{
                Authorization: "Bearer " + token
            }
        })
        dispatch({type:"TOGGLE_AMOUNT",payload:{id,quantity}})
    }

    function removeCartItem(id){
        dispatch({type:"REMOVE_CART_ITEM",payload:id})
    }

    function clearCart(){
        dispatch({type:"CLEAR_CART"})
    }
    return <CartContext.Provider value={{...state,addToCart,toggleAmount,removeCartItem,clearCart,fetchCartItems}}>
        {children}
    </CartContext.Provider>
}

export function useCartContext(){
    return useContext(CartContext)
}


export default CartProvider;
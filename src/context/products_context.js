import React, { useReducer, useContext, useEffect } from 'react'
import ProductReducer from '../reducers/products_reducer';
import {url} from '../utils/constants'
import axios from 'axios';
const token = localStorage.getItem("token")
const ProductsContext = React.createContext();

const initialState = {
    isSideBarOpen : false,
    products: [],
    featured_products:[],
    loading:false,
    single_error:false,
    single_loading:false,
    single_product: {}
}

function ProductsProvider({children}){
    const [state,dispatch] = useReducer(ProductReducer,initialState);
    function openSideBar(){
        dispatch({type:"SIDEBAR_OPEN"})
    }
    function closeSideBar(){
        dispatch({type:"SIDEBAR_CLOSE"})
    }
    const fetchProducts = async(url) => {
        dispatch({ type: "PRODUCTS_LOADING_BEGIN" })
        try {
            const response = await axios.get(url + "getProducts",{
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            dispatch({ type: "PRODUCTS_LOADING_SUCCESS", payload: response.data })
        }
        catch(error) {
            dispatch({ type: "PRODUCTS_LOADING_FAIL" })
        }
    }

    const fetchSingleProduct = async (id) => {
        dispatch({ type: "SINGLE_PRODUCT_BEGIN" })
        try {
            const response = await axios.get(url + `getProduct/${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            dispatch({ type: "SINGLE_PRODUCT_SUCCESS", payload: response.data })
        }
        catch (error) {
            dispatch({ type: "SINGLE_PRODUCT_ERROR" })
        }
    }

    useEffect(()=>{
        token !=="" && fetchProducts(url)
    },[])

    function removeProduct(id){
        dispatch({type: "REMOVE_PRODUCT",payload:id})
    }
    return(
        <ProductsContext.Provider value={{...state,openSideBar,closeSideBar,fetchSingleProduct,removeProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}
export default ProductsProvider;

export function useProductsContext(){
    return (
        useContext(ProductsContext)
    )
}
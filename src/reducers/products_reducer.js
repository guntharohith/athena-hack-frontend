function ProductReducer(state,action){
    if(action.type === "SIDEBAR_OPEN"){
        return {...state,isSideBarOpen: true}
    }
    if(action.type === "SIDEBAR_CLOSE"){
        return {...state,isSideBarOpen: false}
    }
    if (action.type === "PRODUCTS_LOADING_BEGIN") {
        return { ...state, loading: true, error: false }
    }
    if (action.type === "PRODUCTS_LOADING_SUCCESS") {
        const temp = action.payload.filter((product) => product.price > 1000)
        return { ...state, products: action.payload, featured_products:temp, loading: false, error: false }
    }
    if (action.type === "PRODUCTS_LOADING_FAIL") {
        return { ...state, error: true }
    }
    if (action.type === "SINGLE_PRODUCT_BEGIN") {
        return { ...state, single_loading: true, single_error: false }
    }
    if (action.type === "SINGLE_PRODUCT_SUCCESS") {
        return { ...state, single_loading: false, single_product: action.payload }
    }
    if (action.type === "SINGLE_PRODUCT_ERROR") {
        return { ...state, single_loading: false, single_error: true }
    }
    if(action.type === "REMOVE_PRODUCT"){
        const temp = state.products.filter((product) => product.productId !== action.payload)
        return {...state,products:temp }
    }
    return state;

}
export default ProductReducer

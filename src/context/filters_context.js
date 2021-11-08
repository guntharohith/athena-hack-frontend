import React, {useEffect, useReducer, useContext} from 'react'
import {useProductsContext} from './products_context'
import FilterReducer from '../reducers/filters_reducer';
const FilterContext = React.createContext();
const intial_state = {
    all_products:[],
    filtered_products:[],
    grid_view:true,
    sort:"price-lowest",
    filters:{
        text:"",
        category:"all",
        company:"all",
        color:"all",
        min_price:0,
        max_price:0,
        price:0,
        freeShipping:false
        
    }
}

function FilterProvider({children}){
    const [state, dispatch] = useReducer(FilterReducer, intial_state)
    const {products} = useProductsContext()
    useEffect(()=>{
        dispatch({type:"LOAD_PRODUCTS",payload:products})
        dispatch({type:"SORT_PRODUCTS"})
    },[products])
    useEffect(()=>{
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORT_PRODUCTS"})
    },[state.sort,state.filters])
    function setGridView(){
        dispatch({type:"SET_GRID_VIEW"})
    }
    function setListView(){
        dispatch({type:"SET_LIST_VIEW"})
    }

    function updateSort(e){
        dispatch({type:"UPDATE_SORT",payload:e.target.value})
    }

    function updateFilters(e){
        let name = e.target.name
        let value = e.target.value
        if(name === "category"){
            value = e.target.textContent
        }
        if(name === "color"){
            value = e.target.dataset.color
        }
        if(name === "price"){
            value = Number(value)
        }
        if(name === "freeShipping"){
            value = e.target.checked
        }
        dispatch({type:"UPDATE_FILTERS",payload:{name,value}})
    }

    function clearFilters(){
        dispatch({type:"CLEAR_FILTERS"})
    }
    return(
        <FilterContext.Provider value={{...state,setGridView,setListView,updateSort,updateFilters,clearFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilterContext(){
    return useContext(FilterContext)
}
export default FilterProvider;
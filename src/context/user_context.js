import React, {useContext, useEffect, useReducer} from 'react'
import UserReducer from '../reducers/user_reducer'
import axios from 'axios'
import {url} from '../utils/constants'
const token = localStorage.getItem("token")
const UserContext = React.createContext()
const initialState = {
    addresses : [],
    userDetails : {}
}
function UserProvider({children}){
    const [state,dispatch] = useReducer(UserReducer,initialState)
    async function fetchAddresses(){
        const res = await axios.get(url+"get-address",{
            headers:{
                Authorization : "Bearer " + token
            }
        })
        dispatch({type:"FETCH_ADDRESSES",payload:res.data})
    }
    async function fetchUserDetails(){
        const res = await axios.get(url+"get-user-details",{
            headers: {
                Authorization: "Bearer " + token
            }
        })
        dispatch({ type: "FETCH_USER", payload: res.data})

    }
    useEffect(() => {
        token !=="" && fetchAddresses()
        token !=="" && fetchUserDetails()
    },[])
    function addAddress(address){
        axios.post(url+"add-address",address,{
            headers:{
                Authorization: "Bearer " +  token
            }
        }).then((res) => dispatch({type:"ADD_ADDRESS",payload:res.data}))
    }
    return(
        <UserContext.Provider value={{...state,addAddress}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    return useContext(UserContext)
}

export default UserProvider
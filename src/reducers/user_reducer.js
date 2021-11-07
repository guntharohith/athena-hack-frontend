
function UserReducer(state,action){
    const {type,payload} = action
    if(type === "FETCH_USER"){
        return {...state,userDetails:payload}
    }
    if(type === "FETCH_ADDRESSES"){
        return {...state,addresses:payload}
    }
    if(type === "ADD_ADDRESS"){
        return {...state,addresses:[...state.addresses,payload]}
    }
    return state
}
export default UserReducer
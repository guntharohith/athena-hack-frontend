import axios from "axios"
import { url } from "./constants"

const token = localStorage.getItem("token")
export function deleteCartFull(){
    axios.delete(url + "clear-cart", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function deleteCartItem(id){
    axios.delete(url + "delete-cart/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function deleteProduct(id){
    axios.delete(url + "deleteProduct/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

export function deleteOrder(id){
    axios.delete(url + "delete-order/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
}
import React from 'react'
import {useCartContext} from '../context/cart_context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartContent from '../Components/CartContent'
import Loading from '../Components/Loading'
function Cart(){
    const {numberOfItems,cart_loading} = useCartContext()

    if(cart_loading){
        return <Loading/>
    }
    else{
        if (numberOfItems === 0) {
            return (
                <Wrapper>
                    <h1>Your cart is empty</h1>
                    <Link className="btn" to="/products">FILL IT</Link>
                </Wrapper>
            )
        }
        return (
            <CartContent/>
        )
    }
   
}

const Wrapper = styled.div`
    min-height:73vh;
    h1{
        text-align:center;
        color:rgb(24, 24, 60);
        font-size:40px;
    }
    .btn{
        display:block;
        width:75px;
        margin:0 auto;
        padding:7px 10px;
        font-size:15px;
    }

`

export default Cart
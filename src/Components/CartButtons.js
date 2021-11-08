import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import styled from "styled-components";
import {useProductsContext} from '../context/products_context'
import useLocalStorage from '../utils/useLocalStorage';
import { useCartContext } from '../context/cart_context';
function CartButtons() {
    const {closeSideBar} = useProductsContext()
    const {numberOfItems} = useCartContext()
    const [token,setToken] = useLocalStorage("token","")
    useEffect(() => {
        return () => {
            window.location.reload()
        }
    }, [token])
      return (
        <Wrapper className="cart-buttons">
            <Link to="/cart" onClick={closeSideBar} className="cart-btn">Cart
                <span className="cart-container">
                    <FaShoppingCart className="cart-icon"/>
                    <span className="cart-value">{numberOfItems}</span>
                </span>
            </Link>

            <Link to="/login" className="login-btn" onClick={() => {setToken("");localStorage.setItem("role","")}}>Logout<FaUserMinus className="login-icon"/></Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 225px;
    align-items: center;

.cart-btn{
    font-size: 1.5rem;
    color: rgb(5, 5, 26);
    display: flex;
    align-items: center;
    text-decoration: none;
}
.cart-container{
    position: relative;
    display:flex;
    align-items: center;
}
.cart-icon{
    margin-left:5px;
    height: 1.6rem;
}
.cart-value{
    position: absolute;
    top:-10px;
    right:-16px;
    font-size: 0.75rem;
    background-color: green;
    height:16px;
    width:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    border-radius: 50%;
    padding:4px;
}

.login-btn{
    background: transparent;
    border: none;
    display:flex;
    align-items: center;
    font-size: 1.5rem;
    color: rgb(5, 5, 26);
}

.login-icon{
    margin-left: 5px;
}
`
export default CartButtons;
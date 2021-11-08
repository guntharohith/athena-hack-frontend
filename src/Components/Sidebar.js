import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaTimes } from 'react-icons/fa'
import CartButtons from './CartButtons'
import {useProductsContext} from '../context/products_context'
import styled from 'styled-components'
function Sidebar(){
    const {isSideBarOpen, closeSideBar} = useProductsContext();
    return(
        <Wrapper>
            <aside className={`${isSideBarOpen ? 'sidebar sidebar-open' : 'sidebar'}`}>
                <div className="sidebar-header">
                    <Link to="/home" onClick={closeSideBar}>
                        <img src={logo} className="logo" alt="comfy sloth"></img>
                    </Link>
                    <button type="button" className="close-btn" onClick={closeSideBar}><FaTimes /></button>
                </div>
                <ul className="sidebar-links">
                    <li><Link onClick={closeSideBar} to="/home">Home</Link></li>
                    <li><Link onClick={closeSideBar} to="/about">About</Link></li>
                    <li><Link onClick={closeSideBar} to="/products">Products</Link></li>
                    <li><Link onClick={closeSideBar} to="/checkout">Checkout</Link></li>
                    <li><Link onClick={closeSideBar} to="/orders">Orders</Link></li>
                </ul>
                <CartButtons/>
            </aside>
        </Wrapper>
       
    )
}
const Wrapper = styled.div`
    .logo{
        height:50px;
        width:200px;
    }
    .sidebar{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: #fff;
        transition: all 0.3s linear;
        transform: translate(-100%);
    }
    .sidebar-open{
        z-index: 999;
        transform: translate(0);
    }
    .sidebar-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:1rem 1.5rem;
        img{
            height:60px;
            width:200px;
            border-radius:5px;
        }
    }
    .close-btn{
        background: none;
        border:none;
        font-size: 2rem;
        color:red;
    }
    .sidebar-links{
        list-style-type: none;
        margin-bottom: 2rem;

    }
    .sidebar-links li{
        display: block;
        padding:1rem 1rem;
        transition:all 0.3s linear;
    }
    .sidebar-links a{
        text-decoration: none;
        color: rgb(81, 81, 116);
        font-size: 1rem;
        text-align: left;
        letter-spacing: 1px;
        font-weight:bolder;

    }
    .sidebar-links li:hover{
        padding-left:1.5rem;
    }
    .cart-buttons{
        margin: 2rem auto;
    }

    @media screen and (min-width: 992px){
        .sidebar{
            display:none;
        }
    }
`
export default Sidebar;
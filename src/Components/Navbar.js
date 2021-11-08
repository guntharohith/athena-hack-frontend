import CartButtons from "./CartButtons";
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import styled from "styled-components";
import { useProductsContext } from '../context/products_context'

function Navbar() {
    const { openSideBar } = useProductsContext();

    return (
        <Wrapper>
            <div className="navbar-center">
                <div className="navbar-header">
                    <Link to="/home">
                        <img src={logo} alt="UrjaFurniStore" />
                    </Link>
                    <button type="button" className="navbar-toggle" onClick={openSideBar}><FaBars className="navbar-icon" /></button>
                </div>
                <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                </ul>
                <CartButtons />
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.nav`
    height:12vh;
    display:flex;
    align-items: center;
    justify-content: center;

    .navbar-toggle{
        background-color: transparent;
        border: none;
        color:green;
    }
    .navbar-icon{
        font-size: 2rem;
    }
    .navbar-center{
        width: 90vw;
        margin:0 auto;
        max-width:1178px;
    }
    .navbar-header{
        display:flex;
        align-items: center;
        justify-content: space-between;
        img{
            height:60px;
            width:200px;
            border-radius:5px;
        }
    }
    .nav-links{
        display: none;
    }
    .cart-buttons{
        display:none;
    }
    @media (min-width:992px)  {
        .cart-buttons{
            display:grid;
            align-items:center;
        }
        .navbar-toggle{
            display:none;
        }
        .navbar-center{
            width:95vw;
            display:grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
        }
        .nav-links{
            display: flex;
            justify-content: center;
            list-style-type: none;
            li{
                margin:0 0.8rem;
            }
            a{
                text-decoration: none;
                font-size: 1.3rem;
                letter-spacing: 1px;
                color: rgb(82, 82, 143);
                font-size:16px;
                font-weight:bolder;
            }
            a:hover{
                border-bottom: 2px solid green;

            }
        }
        
    }
`
export default Navbar;



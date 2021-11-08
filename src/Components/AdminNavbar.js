import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useEffect } from 'react';
import styled from "styled-components";
import { useProductsContext } from '../context/products_context'
import useLocalStorage from "../utils/useLocalStorage";

function AdminNavbar() {
    const { openSideBar } = useProductsContext();
    const [token, setToken] = useLocalStorage("token", "")
    useEffect(() => {
        return () => {
            window.location.reload()
        }
    }, [token])
    return (
        <Wrapper>
            <div className="navbar-center">
                <div className="navbar-header">
                    <Link to="/admin-home">
                        <img src={logo} alt="Comfy Sloth" />
                    </Link>
                    <button type="button" className="navbar-toggle" onClick={openSideBar}><FaBars className="navbar-icon" /></button>
                </div>
                <ul className="nav-links">
                    <li><Link to="/admin-home">Products</Link></li>
                    <li><Link to="/admin-orders">Orders</Link></li> 
                    <li><Link to="/login" onClick={() => { setToken(""); localStorage.setItem("role","")}}>Logout</Link></li>
                </ul>
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
   
    @media (min-width:992px)  {
        .navbar-toggle{
            display:none;
        }
        .navbar-center{
            width:95vw;
            display:flex;
            justify-content:space-between;
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
export default AdminNavbar;



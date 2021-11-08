import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from '../context/user_context'
import {FaSearch} from 'react-icons/fa'
function Product({productId,name,image,price}){
    const { userDetails } = useUserContext()
    return(
        
        <Wrapper>
            <div className="container">
                <img src={image} alt={name}></img>
                <Link to={`${userDetails.role === "user" ? '/products' : '/admin-home'}/${productId}`} className="link"><FaSearch/></Link>
            </div>
            <div className="product-footer">
                <h3>{name}</h3>
                <p>Rs.{price}</p>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.article`
    .container{
        position:relative;
    }
    .product-footer{
        display:flex;
        align-items:center;
        justify-content:space-between;
        h3{
            text-transform:capitalize;
        }
    }
    img{
        height:200px;
        width:100%;
        display: block;
        object-fit: cover;
        transition:all 0.3s linear;
        border-radius:5px;
    }
    .container:hover img{
        opacity:0.5;
    }
    h3{
        font-weight:400;
        letter-spacing:0.7px;
        color:rgb(5, 5, 26);
    }
    p{
        letter-spacing:1px;
        color:green;
    }
    .link{
        position:absolute;
        transform: translate(-50%, -50%);
        top:50%;
        left:50%;
        opacity:0;
        background-color:hsl(22, 31%, 52%);
        height:2.5rem;
        width:2.5rem;
        border-radius:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        transition:all 0.3s linear;
        svg{
            color:white;
        }
    }
    .container:hover .link{
        opacity:1;
    }
`
export default Product;
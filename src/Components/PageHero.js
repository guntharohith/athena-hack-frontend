import { Link } from "react-router-dom"
import styled from "styled-components"
import {useUserContext} from "../context/user_context"
function PageHero({title,product,admin}){
    const {userDetails} = useUserContext()
    return(
        <Wrapper>
            <div className="section-center">
                {admin ? <h3>Welcome Admin </h3> :
                <h3>
                    <Link to={userDetails.role === "admin" ? "/admin-home":"/home"}>Home </Link>
                    {product && <Link to="/products"> / Products</Link>} / {title}
                </h3>}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color:rgb(238, 200, 186);
    height:15vh;
    display:flex;
    align-items:center;
    a{
        color:darkgreen;
    }
    a:hover{
        color:rgb(34, 52, 34);
    }
    h3{
        font-size:35px;
        color:rgb(34, 52, 34);
        text-transform:capitalize;
        letter-spacing:1px;
    }
   
    
`
export default PageHero
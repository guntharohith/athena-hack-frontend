import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/user_context'

function ListView({products}){
    const { userDetails } = useUserContext()
    return (
        <Wrapper>
            {
                products.map((product) => {
                    const {productId,name,images,price,description} = product
                   return(
                       <div key={productId} className="product-item">
                           <img src={images[0].imageUrl} alt={name}></img>
                           <div>
                               <h3>{name}</h3>
                               <p className="price">Rs.{price}</p>
                               <p className="des">{description.substring(0,150)}...</p>
                               <Link to={`${userDetails.role === "user" ? '/products' : '/admin-home'}/${productId}`} className="btn">Details</Link>
                           </div>
                       </div>

                   )
                })
            }

        </Wrapper>
    )
}
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .product-item{
        display:grid;
        margin-bottom:30px;
        img{
            height:200px;
            width:300px;
            border-radius:5px;
        }
        h3{
            text-transform:capitalize;
            font-weight:bolder;
            letter-spacing:0.7px;
            color:rgb(5, 5, 26);
            font-size:25px;
            margin:0;
        }
    }
    .price{
        letter-spacing:1px;
        color:green;
    }
    .btn{
        padding:5px;
        font-size:10px;
        text-transform:uppercase;
    }
    
    .des{
        color:rgb(48, 48, 84);
        letter-spacing:0.5px;
    }
    @media (min-width:992px){
        .product-item{
            grid-template-columns:300px 1fr;
            column-gap:30px;
            align-items: center;
        }
    }
`
export default ListView
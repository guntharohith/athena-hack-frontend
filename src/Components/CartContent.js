import styled from "styled-components"
import AmountButtons from './AmountButtons'
import { useCartContext } from '../context/cart_context'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { deleteCartFull, deleteCartItem } from "../utils/apiCalls"

function CartContent() {
    const { cartItems, total_amount, toggleAmount, removeCartItem, clearCart } = useCartContext()
    function removeCItem(id) {
        deleteCartItem(id)
        removeCartItem(id)
    }
    function clearAll() {
        deleteCartFull()
        clearCart()
    }
    return (
        <Wrapper className="section-center">
            <div className="cart-columns">
                <h5>Item</h5>
                <h5>Price/Rent</h5>
                <h5>Quantity</h5>
                <h5>Subtotal</h5>
                <span></span>
            </div>
            <hr className="first-line" />
            <div className="cart-items">
                {
                    cartItems.map((item) => {
                        return (
                            <div key={item.cartId} className="main-item">
                                <div className="item">
                                    <img src={item.image} alt={item.name}></img>
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p className="color">Color: <span style={{ background: item.color }}></span></p>
                                        <p className="toggle-price">Rs.{item.price}</p>
                                    </div>
                                </div>
                                <p className="price">Rs.{item.price}</p>
                                <AmountButtons amount={item.quantity} decrease={() => toggleAmount(item.cartId, "dec", item.quantity)} increase={() => toggleAmount(item.cartId, "inc", item.quantity)}></AmountButtons>
                                <p className="price">Rs.{(item.price * item.quantity).toFixed(2)} </p>
                                <button type="button" onClick={() => removeCItem(item.cartId)} className="trash"><FaTrash /></button>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            <div className="btns">
                <Link to="/products">Continue Shopping</Link>
                <Link className="btn" to='/checkout'>Checkout</Link>
            </div>
            <div className="bill-main">
                <div>
                    <div className="bill">
                        <p className="subtotal">Subtotal:<span>Rs.{total_amount}</span></p>
                        <p className="shipping-fee">Shipping Fee:<span>Rs.300</span></p>
                        <hr />
                        <h2 className="total-amount">Order Total:<span>Rs.{(total_amount + 300).toFixed(2)}</span></h2>
                    </div>
                    {localStorage.getItem("token") === "" && <Link to="/login">LOGIN</Link>}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .cart-columns{
        display: grid;
        grid-template-columns: 316px 1fr 1fr 1fr auto;
        justify-items: center;
        column-gap: 1rem;
        h5{
            color:rgb(150, 102, 102);
            font-weight:400;
            font-size:20px;
        }
        span{
            height:2rem;
            width:2rem;
        }
    }
    .cart-items{
        margin-top:50px;
    }
    .toggle-price{
        display:none;
    }
    hr{
        margin:0;
        margin-bottom:3rem;
    }
    .item{
        display:grid;
        grid-template-rows:75px;
        grid-template-columns:75px 125px;
        column-gap:15px;
        align-items:center;
        img{
            height:100%;
            width:100%;
            border-radius:5px;
        }
        div{
            h5{
                text-transform:capitalize;
                color:rgb(37, 37, 53);
                letter-spacing:1px;
                font-weight:bolder;
                margin:0;
            }
            p{
                margin:0;
                font-size:15px;
            }

        }
    }
    span{
        display:inline-block;
        height:0.7rem;
        width:0.7rem;
        border-radius:2px;
        margin-left:0.5rem;
    }
    .color{
        color:rgb(150, 102, 102);
        font-size:15px;
        letter-spacing:0.7px;
        margin:0;
        display:flex;
        align-items:center;
        justify-content:flex-start;
    }
    .price{
        letter-spacing:1px;
        color:green;
        font-weight:700;
        text-align:center;
    }
    
    .trash{
        border:none;
        background-color:red;
        color:white;
        padding:5px;
        border-radius:3px;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .main-item{
        display:grid;
        grid-template-columns: 316px 1fr 1fr 1fr auto;
        align-items: center;
        grid-template-rows: 75px;
        justify-items:center;
        gap: 3rem 1rem;
        margin-bottom:3rem;
        .date{
            font-size:15px;
            text-align:center;
            color:rgb(37, 37, 53);
            font-weight:500;
        }
    }
    .amount-btns{
        width:100px;
        h1{
            font-size:25px;
        }
    }
    .btns{
        display:flex;
        justify-content:space-between;
        align-items:center;
        a{
            text-decoration:none;
            background-color:rgb(103, 164, 103);
            color:white;
            padding:7px 10px;
            border-radius:5px;
            font-size:17px;
            letter-spacing:0.7px;
        }
        button{
            border:none;
            background-color:black;
            color:white;
            padding:7px 10px;
            border-radius:5px;
            font-size:17px;
            letter-spacing:0.7px;
        }
    }
    .bill{
        padding:20px;
        border:1px solid rgb(179, 152, 152);
        border-radius:5px;
        width:350px;
        margin-top:30px;
        margin-bottom:15px;
        p,h2{
            display:grid;
            grid-template-columns:1fr 1fr;
        }
        .subtotal{
            color:rgb(24, 24, 60);
            font-weight:bolder;
            letter-spacing:1px;

        }
        .shipping-fee{
            letter-spacing:1px;
            color:rgb(70, 70, 97);
        }
        h2{
            letter-spacing:1px;
        }
        hr{
            margin:0;
        }
    }

    .bill-main{
        display:flex;
        justify-content:flex-end;
        a{
            display:block;
            border:none;
            background-color:rgb(189, 86, 86);
            color:white;
            text-align:center;
            padding:8px;
            border-radius:3px;
            font-size:15px;
            letter-spacing:1px;
            margin-bottom:30px;
            font-weight:bolder;
        }
    }
    @media (max-width:768px){
        .cart-columns{
            display:none;
        }
        .price{
            display:none;
        }
        .main-item{
            grid-template-columns:1fr 1fr 1fr;
        }
        .toggle-price{
            display:block;
            color:green;
            font-weight:700;
            font-size:13px;
            margin:0;
        }
        .first-line{
            display:none;
        }
        .color{
            font-size:13px;
        }
        .bill-main{
            justify-content:center;
        }
    }

   

`

export default CartContent
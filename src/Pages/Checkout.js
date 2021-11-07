import { useState } from "react"
import styled from "styled-components"
import { useCartContext } from '../context/cart_context'
import {useUserContext} from '../context/user_context'
import PageHero from '../Components/PageHero'
import { IoMdAddCircle, IoMdSend} from 'react-icons/io'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {url} from '../utils/constants'
import { deleteCartFull } from "../utils/apiCalls"
const token = localStorage.getItem("token")

function Checkout(){
    const {cartItems,numberOfItems, total_amount, clearCart } = useCartContext()
    const {addresses,userDetails,addAddress} = useUserContext()
    const [modal,setModal] = useState(false)
    const [address,setAddress] = useState({
        hNoStreet:"",
        city:"",
        state:"",
        pinCode:""
    })
    const {hNoStreet,city,state,pinCode} = address
    function onChange(e){
        setAddress({...address,[e.target.name]:e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault()
        addAddress(address)
        setAddress({})
        setModal(false)
    }
    function saveOrders(){
        const date = new Date()
        cartItems.map((cart) => 
            axios.post(url + "add-order", {
                date: date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"  "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(), price: cart.price, quantity: cart.quantity, image: cart.image, name: cart.name, status: "Placed", total: total_amount
            },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                
        )
        deleteCartFull()
        clearCart()
    }
    if(numberOfItems === 0){
        return(
            <Wrapper>
                <PageHero title="Checkout" />
                <div className="empty-cart">
                    <h1>Your cart is empty</h1>
                    <Link className="btn" to="/products">FILL IT</Link>
                </div>
            </Wrapper>
            
        )
    }
    return(
      <Wrapper>
            <PageHero title="Checkout"/>
            <div className="checkout section section-center">
                <div className="name-bill">
                    <h3>Hello, {userDetails.userName}</h3>
                    <p>Your total is Rs.{(total_amount + 300).toFixed(2)}</p>
                </div>
                <h2>Select an Address</h2>
                <form className="address-select">
                    {
                        addresses.map((address) => {
                            return (
                                <div className="address-control" key={address.addressId}>
                                    <input type="radio" name="address" value={address}></input>
                                    <p>{address.hNoStreet + " ," + address.city}<br></br>{address.state + " ," + address.pinCode}</p>
                                </div>
                            )
                        })
                    }
                </form>
                <button className="btn" onClick={()=>setModal(!modal)} type="button"><IoMdAddCircle/> Add New Address</button>
                {modal && <form className="address-form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input type="text" name="hNoStreet" value={hNoStreet} onChange={onChange} placeholder="HouseNo/Street"></input>
                    </div>
                    <div className="form-control">
                        <input type="text" name="city" value={city} onChange={onChange} placeholder="City"></input>
                    </div>
                    <div className="form-control">
                        <input type="text" name="state" value={state} onChange={onChange} placeholder="State"></input>
                    </div>
                    <div className="form-control">
                        <input type="text" name="pinCode" value={pinCode} onChange={onChange} placeholder="Pincode"></input>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn">SAVE</button>
                        <button type="button" onClick={()=>setModal(false)} className="btn">CANCEL</button>
                    </div>

                </form>}
                <button onClick={saveOrders} className="btn icon-btn">Proceed to Pay <IoMdSend/></button>
            </div>
      </Wrapper>  
    )
}

const Wrapper = styled.div`
    min-height:76vh;
    .empty-cart{
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
    }
    .checkout{
        padding-top:2rem;
        width:50vw;
        .btn{
            padding:7px;
            font-size:15px;
            display:flex;
            align-items:center;
            justify-content:center;
            svg{
                margin-right:10px;
                font-size:15px;
            }
        }
        .icon-btn{
            background-color:rgb(76, 76, 205);
            margin:0 auto;
            margin-top:30px;
            svg{
                margin-left:10px;
                margin-right:0;
            }
        }
        .icon-btn:hover{
            color:white;
            background-color:rgb(129, 129, 203);
        }
        h2{
            color:rgb(37, 37, 53);
            letter-spacing:1px;
        }
        h3{
            color:rgb(37, 37, 53);
            letter-spacing:1px;
            text-transform:capitalize;
            margin:0;
            margin-bottom:10px;
        }
        .name-bill{
            text-align:center;
        }

    }
    .address-form{
        width:20vw;
        margin-top:20px;
        border:2px solid rgb(194, 158, 158);
        border-radius:5px;
        padding:10px;
        .form-control{
            margin-bottom:1rem;
        }
        input{
            width:100%;
            border:none;
            border-bottom:2px solid rgb(194, 158, 158);
            padding-bottom:5px;
            background:transparent;
        }
        input:focus{
            outline:none;
            border-bottom:2px solid black;
        }
        input::placeholder{
            letter-spacing:1px;
            font-weight:bold;
        }
        input:focus::placeholder{
            color:black;
        }
        .btn-group{
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .btn{
            padding:7px;
            font-size:12px;
        }
        

    }
    .address-select{
        .address-control{
            display:grid;
            grid-template-columns:50px 1fr;
            align-items:center;
            column-gap:20px;
            margin-bottom:10px;
            padding:7px 0 7px 5px;
            border-radius:5px;
            background-color:rgb(230, 212, 212);

        }
    }
    p{
        margin:0;
        line-height:1.5rem;
        letter-spacing:0.5px;
        color:rgb(37, 37, 53);
        font-weight:400;
    }
`
export default Checkout
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { url } from '../utils/constants'
import styled from 'styled-components'
import PageHero from '../Components/PageHero'
const token = localStorage.getItem("token")

function Orders(){
    const [orders,setOrders] = useState([])
    useEffect(() => {
        axios.get(url+"get-orders",{
            headers:{
                Authorization:"Bearer " + token
            }
        }).then((res) => setOrders(res.data))
    },[])
    return(
        <React.Fragment>
            <PageHero title="Orders"/>
            <Wrapper className="section section-center">
                <h1>Your Orders</h1>
                <div className="line"></div>
                <div className="orders">
                    {
                        orders.map((order) => {
                            return (
                                <div className="order" key={order.orderId}>
                                    <img src={order.image} alt={order.name}></img>
                                    <div>
                                        <p>{order.status}</p>
                                        <p>{order.date}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Wrapper>
        </React.Fragment>
       
    )
}

const Wrapper = styled.div`
    min-height:42vh;
    padding-top:30px;
    width:50vw;
    h1{
        color:rgb(37, 37, 53);
        letter-spacing:2px;
        text-align:center;
        margin:0;
    }
    .line{
        height:4px;
        width:100px;
        background-color:hsl(22, 31%, 52%);
        margin:0 auto;
        margin-top:5px;
        margin-bottom:30px;
    }
    .orders{
        .order{
            display:grid;
            grid-template-columns:50px auto;
            column-gap:30px;
            align-items:center;
            margin-bottom:20px;
            background-color:rgb(230, 212, 212);
            border-radius:5px;
            img{
                width:60px;
                height:60px;
                border-radius:5px;
            }
            div{
                p{
                    margin:0;
                    font-size:15px;
                    letter-spacing:0.5px;
                    color:rgb(37, 37, 53);
                    font-weight:400;
                    line-height:1.5rem;
                }
            }
        }
    }
`
export default Orders
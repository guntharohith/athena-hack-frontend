import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import PageHero from '../../Components/PageHero'
import axios from 'axios'
import {FaTrash} from 'react-icons/fa'
import {url} from '../../utils/constants'
import {deleteOrder} from '../../utils/apiCalls'
const token = localStorage.getItem("token")
function AdminOrders() {
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        axios.get(url+"get-all-orders",{
            headers:{
                Authorization: "Bearer " + token
            }
        }).then((res) => setOrders(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function removeOrder(id){
        const temp = orders.filter((order) => order.orderId !== id)
        setOrders(temp)
        deleteOrder(id)
    }
    
    return (
        <Wrapper>
            <PageHero title="Orders"/>
            <section className="section-center">
                <div className="order-columns">
                    <h5>OrderId</h5>
                    <h5>Name</h5>
                    <h5>Quantity</h5>
                    <h5>Subtotal</h5>
                    <h5>OrderedBy</h5>
                    <h5>Action</h5>
                </div>
                <hr className="line" />
                {orders.length !== 0 ? <div className="orders">
                    {
                        orders.map((order)=>{
                            return(
                                <div className="order" key={order.orderId}>
                                    <p>{order.orderId}</p>
                                    <p className="name">{order.name}</p>
                                    <p>{order.quantity}</p>
                                    <p>{(order.quantity * order.price).toFixed(2)}</p>
                                    <p>{order.email}</p>
                                    <FaTrash onClick={() => removeOrder(order.orderId)}/>
                                </div>
                            )
                        })
                    }
                </div> : <h1>There are no Orders</h1>}
            </section>
        </Wrapper>
    )
}

export default AdminOrders

const Wrapper = styled.div`
    section{
        min-height:62vh;
        .order-columns{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
            justify-items: center;
            column-gap: 1rem;
            h5{
                color:rgb(150, 102, 102);
                font-weight:500;
                font-size:20px;
                letter-spacing:1px;
            }
        }
        hr{
            margin:0;
            margin-bottom:20px;
        }
        .orders{
            .order{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                justify-items: center;
                column-gap: 1rem;
                align-items:center;
                margin-bottom:30px;
                p{
                    color:rgb(37, 37, 53);
                    letter-spacing:1px;
                    font-weight:700;
                }
                .name{
                    text-transform:capitalize;
                }
                svg{
                    color:red;
                }
               
            }

        }
        h1{
            text-align:center;
            margin-bottom:30px;
            letter-spacing:1px;
            color:rgb(37, 37, 53);
        }
    }
`
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import PageHero from '../../Components/PageHero'
import axios from 'axios'
import {url} from '../../utils/constants'
const token = localStorage.getItem("token")
function AdminOrders() {
    const [orders, setOrders] = useState([])
    console.log(orders)
    useEffect(()=>{
        axios.get(url+"get-all-orders",{
            headers:{
                Authorization: "Bearer " + token
            }
        }).then((res) => setOrders(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Wrapper>
            <PageHero title="Orders"/>
            <div className="section-center">
                {orders.map((order) => {
                    return(
                        <div>
                            
                        </div>
                    )
                })}
            </div>
        </Wrapper>
    )
}

export default AdminOrders

const Wrapper = styled.div`
`
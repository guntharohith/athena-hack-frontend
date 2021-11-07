import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'

function Welcome() {
    return (
        <Wrapper className="section-center">
            <img src={logo} alt="UrjaFurniStore" />
            <h1>Welcome to UrjaFurniStore</h1>
        </Wrapper>
    )
}

export default Welcome

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    img{
        height:60px;
        width:200px;
        border-radius:5px;
    }
    h1{
        color:rgb(5, 5, 26);
        letter-spacing:1px;
    }
`

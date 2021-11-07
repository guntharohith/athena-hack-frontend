import styled from "styled-components"

function Footer(){
    return (
        <Wrapper>
            <p><span>&copy;</span> 2021 UrjaFurniStore All Rights Reserved</p>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    height:12vh;
    background-color:black;
    display:flex;
    align-items:center;
    justify-content:center;
    p{
        color:white;
        letter-spacing:1px;
        font-size:18px;
        
    }
`
export default Footer
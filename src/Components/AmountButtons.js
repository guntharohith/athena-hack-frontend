import { FaPlus, FaMinus } from 'react-icons/fa'
import styled from 'styled-components'
function AmountButtons({amount,decrease,increase}){
    return(
        <Wrapper className="amount-btns">
            <button onClick={decrease}><FaMinus /></button>
            <h1>{amount}</h1>
            <button onClick={increase}><FaPlus /></button>
        </Wrapper>
    )
   
}
const Wrapper = styled.div`
        margin-top:10px;
        display:grid;
        width:150px;
        justify-items:center;
        grid-template-columns:repeat(3,1fr);
        align-items:center;
        column-gap:15px;
        span{
            font-size:40px;
        }
        button{
            border:none;
            background:transparent;
        }
`
export default AmountButtons
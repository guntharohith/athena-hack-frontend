import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'
import styled from 'styled-components'

function Stars({stars,reviews}){
    const tempArr = Array.from({length:5},(_,index) => {
        const temp = index + 0.5
        return (
            <span key={index}>
                {
                    stars > temp ? <BsStarFill/> : stars > index ? <BsStarHalf/> : <BsStar/>
                }
            </span>
        )
    })
    return (
        <Wrapper>
            <div className="stars">{tempArr}</div>
            <p>({reviews} customer reviews)</p>
        </Wrapper>

    )
}
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    span{
        color:green;
        margin-right:3px;
    }
    p{
        margin-left:10px;
        color:rgb(37, 37, 53);
        font-weight:400;
    }
`
export default Stars

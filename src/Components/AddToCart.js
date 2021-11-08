import styled from "styled-components"
import { FaCheck} from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"
import {useCartContext} from '../context/cart_context'
import AmountButtons from "./AmountButtons"

function AddToCart({product}){
    const {stock,colors} = product
    const {addToCart, progress} = useCartContext()
    const [amount,setAmount] = useState(1)
    const [mainColor,setMainColor] = useState(colors[0].color)
    function increase(){
        setAmount((prev) => {
           if(amount >= stock){
               return stock
           }
           return prev+1

        })
    }
    function decrease(){
        setAmount((prev) => {
            if (amount <= 1) {
                return 1
            }
            return prev - 1

        })
    }
    return(
        <Wrapper>
            <div className="colors">
                <span>Colors:</span>
                <div>
                    {
                        colors.map((col) => {
                            const {colorId,color} = col
                            return (
                                <button key={colorId} style={{ backgroundColor: color }}
                                    onClick={() => setMainColor(color)}
                                    className={`${color === mainColor ? 'color-btn active' : 'color-btn'}`} >
                                    {color === mainColor ? <FaCheck /> : null}</button>
                            )
                        })
                    }

                </div>
            </div>
            <div className="cart">
                <AmountButtons amount={amount} decrease={decrease} increase={increase} />
                <Link to="/cart" onClick={() => addToCart(mainColor, amount, product)} className="btn">ADD TO CART </Link>
            </div>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    
    .colors{
        display:grid;
        grid-template-columns:100px 1fr;
        align-items:center;
        column-gap:10px;
        margin-top:20px;
        div{
            display:flex;
        }
    }
    .color-btn{
        height:1.5rem;
        width:1.5rem;
        border-radius:50%;
        border:none;
        margin-right:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        opacity:0.5;
        svg{
            color:white;
        }
    }
    .active{
        opacity:1;
    }
    .btn{
        display:inline-block;
        width:130px;
        padding:7px;
        font-size:15px;
    }
    @media (max-width:1124px)  and (min-width:992px){
        .cart{
            .line{
                width:90%;
                height:2px;
                margin:0 auto;
            }
            grid-template-columns:1fr;
            row-gap:20px;
        }
    }
`
export default AddToCart
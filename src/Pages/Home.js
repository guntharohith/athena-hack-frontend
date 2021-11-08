import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import heroBcg2 from '../assets/heroBcg2.jpeg'
import heroBcg from '../assets/heroBcg.jpg'
import FeaturedProducts from '../Components/FeaturedProducts';
function Home(){
   
    return(
        <Wrapper>
            <div className="home section-center">
                <div className="home-left">
                    <h1>Design Your <br></br> Comfort Zone</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Iusto, at sed omnis corporis doloremque possimus velit! 
                        Repudiandae nisi odit, aperiam odio ducimus, obcaecati 
                        libero et quia tempora excepturi quis alias?</p>
                    <Link className="btn" to="/products">SHOP NOW</Link>
                </div>
                <div className="home-right">
                    <img src={heroBcg2} className="herobcg2" alt="heroBcg2"></img>
                    <img src={heroBcg} className="herobcg" alt="heroBcg"></img>
                </div>
            </div>
            <FeaturedProducts/>
        </Wrapper>
        
    )
}
const Wrapper = styled.div`
    .home{
        display:grid;
        grid-template-columns:1fr 1fr;
        column-gap:4rem;
        align-items:center;
        margin-bottom:30px;
        margin-top:20px;
        .home-left{
            h1{
                color:rgb(37, 37, 53);
                letter-spacing:1px;
                margin:0;
                margin-bottom:40px;
                font-size:50px;
            }
            p{
                line-height:2rem;
                font-weight:400;
                font-size:20px;
                color:rgb(30, 30, 65);
                margin-bottom:50px;
            }
        }
        .home-right{
            display:grid;
            grid-template-columns:1fr auto;
            align-items:end;
            img{
                border-radius:5px;
            }
            .herobcg2{
                width:250px;
                margin-right:-150px;
                z-index:1;
            }
            .herobcg{
                width:450px;
                height:450px;
            }
        }
    }
    
    @media (max-width:992px){
        .home{
            grid-template-columns:1fr;
            margin-bottom:80px;
            margin-top:50px;
            width:80vw;
            .home-left{
                .btn{
                    font-size:15px;
                    padding:7px;
                }
                h1{
                    margin-bottom:20px;
                    font-size:40px;
                }
            }
            .home-right{
                display:none;
            }
        }
        
    }

`
export default Home;
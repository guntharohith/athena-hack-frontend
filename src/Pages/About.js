import styled from 'styled-components'
import PageHero from '../Components/PageHero'
import heroBcg from '../assets/heroBcg.jpg'
function About(){
    return(
        <Wrapper>
            <PageHero title="About"></PageHero>
            <div className="about section section-center">
                <img src={heroBcg} alt="aboutImage"></img>
                <div>
                    <h1>Our Story</h1>
                    <div className="line"></div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis 
                        est exercitationem molestiae delectus saepe odio eligendi modi porro eaque 
                        in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .about{
        display:grid;
        grid-template-columns:1fr 1fr;
        column-gap:4rem;
        img{
            width:100%;
            height:500px;
            border-radius:10px;
        }
        div{
            h1{
                color:rgb(37, 37, 53);
                letter-spacing:1px;
                margin:0;
                margin-bottom:10px;
            }
            p{
                line-height:2rem;
                font-weight:400;
                color:rgb(30, 30, 65);
            }
            .line{
                width:100px;
                height:4px;
                background-color:green;
                margin-bottom:30px;
            }
        }
    }
`
export default About
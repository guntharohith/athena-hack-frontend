import styled from "styled-components";
import ProductsList from "../Components/ProductsList";
import PageHero from "../Components/PageHero"
import Sort from "../Components/Sort"
import Filter from "../Components/Filter"
function Products(){
    return(
        <main>
            <PageHero title="Products"/>
            <Wrapper className="section section-center">
                <div className="product">
                    <Filter/>
                    <div>
                        <Sort/>
                        <ProductsList />
                    </div>
                </div>
            </Wrapper>

        </main>
       
    )
}
const Wrapper = styled.div`
    .product{
        display:grid;
        gap: 3rem 1.5rem;
    }
    @media (min-width:768px){
        .product{
             grid-template-columns: 200px 1fr;

        }
    }
   
`
export default Products;
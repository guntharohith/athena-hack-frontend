import React from 'react'
import styled from 'styled-components'
import Filter from '../../Components/Filter'
import Sort from '../../Components/Sort'
import ProductsList from '../../Components/ProductsList'
import PageHero from '../../Components/PageHero'
import {Link} from 'react-router-dom'
function AdminHome() {
    return (
        <main>
            <PageHero admin/>
            <Wrapper className="section section-center">
                <Link to="/add-product" className="btn">Add Product</Link>
                <div className="product">
                    <Filter />
                    <div>
                        <Sort />
                        <ProductsList />
                    </div>
                </div>
            </Wrapper>

        </main>
    )
}

export default AdminHome

const Wrapper = styled.div`
    .btn{
        display:block;
        width:165px;
        font-size:15px;
    }
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
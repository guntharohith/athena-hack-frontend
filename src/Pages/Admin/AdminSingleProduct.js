import React, { useEffect } from 'react'
import Loading from '../../Components/Loading'
import { useProductsContext } from '../../context/products_context'
import styled from 'styled-components'
import ImageContainer from '../../Components/ImageContainer'
import Stars from '../../Components/Stars'
import PageHero from '../../Components/PageHero'
import { Link, useParams } from 'react-router-dom'
import {deleteProduct} from '../../utils/apiCalls'

function AdminSingleProduct() {
    const { id } = useParams()
    const { single_product, single_loading, single_error, fetchSingleProduct, removeProduct } = useProductsContext()
    useEffect(() => {
        fetchSingleProduct(id)
        //eslint-disable-next-line
    }, [id])
    if (single_loading) {
        return <Loading />
    }
    if (single_error) {
        return <h2>Sorry, there was an error...</h2>
    }
    return (
        <Wrapper >
            <PageHero title={single_product.name}/>
            <div className="section section-center">
                <div className="product-center">
                    <ImageContainer images={single_product.images} />
                    <div>
                        <h1 className="title">{single_product.name}</h1>
                        <Stars stars={single_product.stars} reviews={single_product.reviews} />
                        <p className="price">$ {single_product.price / 100}</p>
                        <p className="des">{single_product.description}</p>
                        <p className="info">
                            <span>Available:</span>
                            {single_product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <p className="info">
                            <span>SKU:</span>
                            {single_product.productId}
                        </p>
                        <p className="info">
                            <span>Brand:</span>
                            {single_product.company}
                        </p>
                        <div className="btn-group">
                            <Link to={`/edit-product/${single_product.productId}`} className="btn">Edit</Link>
                            <Link to="/admin-home" onClick={() => {deleteProduct(single_product.productId);removeProduct(single_product.productId)}} className="btn">Delete</Link>
                        </div>
                    </div>
                </div>


            </div>



        </Wrapper>

    )
}
const Wrapper = styled.main`
    .product-center{
        display:grid;
        row-gap:30px;
    }
    .info{
        text-transform: capitalize;
        display:grid;
        grid-template-columns:100px 1fr;
        column-gap:10px;
        color:rgb(37, 37, 53);
    }
    .title{
        text-transform:capitalize;
        color:rgb(37, 37, 53);
        letter-spacing:2px;
        margin-top:0;
    }
    .price{
        letter-spacing:1px;
        color:green;
        font-weight:700;
    }
    .des{
        letter-spacing:0.7px;
        color:rgb(37, 37, 53);
        line-height:25px;
    }
    span{
        font-weight:bolder;
    }
    .btn-group{
        display:flex;
        justify-content:space-between;
        .btn{
            font-size:15px;
        }
    }
    @media (min-width:992px){
        .product-center{
            grid-template-columns:1fr 1fr;
            column-gap:40px;
            align-items:start;
        }
        
    }
`
export default AdminSingleProduct

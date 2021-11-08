import { useProductsContext } from '../context/products_context'
import styled from 'styled-components'
import Product from './Product'
import { Link } from 'react-router-dom'
import Loading from './Loading'
function FeaturedProducts() {
    const { featured_products, loading } = useProductsContext()
    if (loading) {
        return <Loading />
    }
    else {
        return (
            <Wrapper>
                <h1>Featured Products</h1>
                <div className="underLine"></div>
                <div className="featured-products">
                    {featured_products.slice(0, 3).map((product) => {
                        const { productId, name, images, price } = product
                        return <Product key={productId} productId={productId} name={name} image={images[0].imageUrl} price={price} />
                    })}
                </div>
                <Link to="/products" className="btn">All Products</Link>
            </Wrapper>
        )
    }
}
const Wrapper = styled.div`
    margin:0px auto;
    background-color:rgb(230, 212, 212);
    padding:60px;
    margin-bottom:50px;
    .featured-products{
        display:grid;
        grid-template-columns:1fr 1fr 1fr;
        column-gap: 40px;
        margin:0 60px;
        margin-bottom:30px;
    }
    h1{
        text-align:center;
        color:rgb(42, 42, 72);
        letter-spacing: 0.7px;
        margin-bottom:0px;
    }
    .underLine{
        height:3px;
        width:150px;
        background-color:rgb(14, 14, 31);
        margin:0 auto;
        margin-bottom:30px;
    }
    .btn{
        font-size:15px;
        width:150px;
        display:block;
        text-align:center;
        margin:0 auto;
        padding:7px;
        text-transform:uppercase;
    }
    @media (max-width:768px){
        .featured-products{
            grid-template-columns:1fr;
            row-gap:30px;
            margin:0;
            margin-bottom:30px;

        }
    }

    @media (min-width:768px) and (max-width:1222px){
        .featured-products{
            grid-template-columns:1fr 1fr;
            row-gap:30px;
            margin:0;
            margin-bottom:30px;
        }
    }
`
export default FeaturedProducts

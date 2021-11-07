import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import heroBcg from '../../assets/heroBcg.jpg'
import Loading from '../../Components/Loading'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import PageHero from '../../Components/PageHero'
import { url } from '../../utils/constants'
const token = localStorage.getItem("token")

function EditProduct() {
    const { id } = useParams()
    const [loading,setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [colors, setColors] = useState([])
    const [product, setProduct] = useState({
     
    })
    const { name, price, description, company, stock, stars, reviews, category, shipping, image, color } = product

    useEffect(() => {
        setLoading(true)
        axios.get(url + `getProduct/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            const { name, price, description, company, stock, stars, reviews, category, shipping, images, colors} = res.data
            setProduct({...product,name,price,description,company,stock,stars,reviews,category,shipping})
            setImages(images)
            setColors(colors)
            setLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function onChange(e) {
        const tname = e.target.name
        if (tname === "shipping") {
            setProduct({ ...product, [tname]: e.target.checked })
        }
        else {
            setProduct({ ...product, [tname]: e.target.value })
        }
    }

    function handleProduct(e) {
        e.preventDefault()
        axios.put(url + "updateProduct/" + id, {
            name, price, description, company, stock, stars, reviews, category, shipping, images, colors
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    function deleteColor(id){
        const temp = colors.filter((col) => col.colorId !== id)
        setColors(temp)
    }

    function deleteImage(id){
        const temp = images.filter((image) => image.imageId !== id)
        setImages(temp)
    }
    if(loading){
        return <Loading/>
    }
    return (
        <Wrapper>
            <PageHero title="Edit Product" />
            <div className="section-center">
                <img src={heroBcg} alt="heroBcg"></img>
                <form onSubmit={handleProduct}>
                    <div className="form-control">
                        <input type="text" name="name" placeholder="Product Name" value={name} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <input type="number" name="price" placeholder="Price" value={price} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <textarea rows={3} name="description" placeholder="Description" value={description} onChange={onChange}></textarea>
                    </div>
                    <div className="form-control">
                        <input type="text" name="company" placeholder="Company" value={company} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <input type="number" name="stock" placeholder="Stock" value={stock} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <input type="number" name="stars" placeholder="Rating out of 5" value={stars} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <input type="number" name="reviews" placeholder="Reviews" value={reviews} onChange={onChange}></input>
                    </div>
                    <div className="form-control">
                        <input type="text" name="category" placeholder="Category" value={category} onChange={onChange}></input>
                    </div>
                    <div className="form-control shipping">
                        <label htmlFor="shipping">Free Shipping</label>
                        <input type="checkbox" name="shipping" value={shipping} onChange={onChange}></input>
                    </div>
                    <div className="form-control link">
                        <input type="text" name="image" placeholder="Image Url" value={image} onChange={onChange}></input>
                        <button type="button" className="btn" onClick={() => { setImages([...images, image]); setProduct({ ...product, image: "" }) }}>Add</button>
                    </div>
                    <div className="items">
                        {images.map((image) => {
                            return (
                                <p>{image.imageUrl}<FaTimes onClick={() => deleteImage(image.imageId)}/></p>
                            )
                        })}
                    </div>
                    <div className="form-control link">
                        <input type="text" name="color" placeholder="Color" value={color} onChange={onChange}></input>
                        <button type="button" className="btn" onClick={() => { setColors([...colors, color]); setProduct({ ...product, color: "" }) }}>Add</button>
                    </div>
                    <div className="items">
                        {colors.map((col) => {
                            return (
                                <p>{col.color}<FaTimes onClick={() => deleteColor(col.colorId)}/></p>
                            )
                        })}
                    </div>
                    <button type="submit" className="btn">Save Product</button>
                </form>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    .section-center{
        display:grid;
        grid-template-columns:1fr 1fr;
        column-gap:50px;
        margin-bottom:30px;
        margin-top:30px;
    }
    img{
        width:300px;
        height:300px;
        border-radius:5px;
    }
    form{
        border:2px solid rgb(194, 158, 158);
        border-radius:5px;
        padding:20px;
        .form-control{
            margin-bottom:1rem;
            select{
                margin-left:10px;
                border:2px solid rgb(194, 158, 158);
            }
            label{
                color:rgb(62, 74, 62);
                letter-spacing:1px;
                font-size:15px;
                font-weight:500;
            }
        }
        .link{
            display:flex;
            .btn{
                margin-left:15px;
            }
        }
        .shipping{
            display:grid;
            grid-template-columns:200px 1fr;
            align-items:center;
        }
        input,textarea{
            width:100%;
            border:none;
            border-bottom:2px solid rgb(194, 158, 158);
            padding-bottom:5px;
            background:transparent;
        }
        input:focus{
            outline:none;
            border-bottom:2px solid black;
        }
        textarea:focus{
            outline:none;
            border-bottom:2px solid black;
        }
        input::placeholder{
            letter-spacing:1px;
            font-weight:bold;
        }
        input:focus::placeholder{
            color:black;
        }
        textarea::placeholder{
            letter-spacing:1px;
            font-weight:bold;
        }
        textarea:focus::placeholder{
            color:black;
        }
        .btn-group{
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .btn{
            padding:7px;
            font-size:12px;
        }
        .items{
            p{
                display:flex;
                align-items:center;
                justify-content:space-between;
                background-color:rgb(238, 200, 186);
                border-radius:5px;
                padding:10px;
                border-left:5px solid rgb(176, 146, 146);
                font-size:15px;
                color:rgb(5, 5, 26);
            }
        }
    }
`
export default EditProduct

import {getUniqueItems} from '../utils/helper'
import {useFilterContext} from '../context/filters_context'
import styled from 'styled-components'
import { FaCheck } from "react-icons/fa"
function Filter(){
    const {all_products,
    filters:{
        text,
        category,
        company,
        color,
        min_price,
        max_price,
        price,
        freeShipping
    },updateFilters,clearFilters} = useFilterContext()
    const companies = getUniqueItems(all_products,"company")
    const categories = getUniqueItems(all_products,"category")
    const colors = getUniqueItems(all_products,"colors")
    return(
        <Wrapper>
            <div className="content">
                <form>
                    <div className="form-control">
                        <input className="search" type="text" name="text" placeholder="Search" value={text} onChange={updateFilters}></input>
                    </div>
                    <div className="form-control">
                        <h5>Category</h5>
                        <div>
                            {
                                categories.map((cat) => {
                                    return (
                                        <button key={cat} type="button" name="category" onClick={updateFilters} className={`${cat.toLowerCase() === category ? 'btn-cat active-cat' : 'btn-cat'}`}>{cat}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <h5>Comapany</h5>
                        <select value={company} onChange={updateFilters} name="company">
                            {
                                companies.map((com) =>{
                                    return <option key={com} value={com}>{com}</option>
                                } )
                            }
                        </select>
                    </div>
                    <div className="form-control">
                        <h5>Colors</h5>
                        <div className="colors">
                            {
                                colors.map((col) => {
                                    if(col === "all"){
                                        return <button key={col} onClick={updateFilters} type="button" name="color" data-color="all" className={`${color === "all" ? 'btn-all active-cat' : 'btn-all'}`}>All</button>

                                    }
                                    return(
                                        <button key={col} onClick={updateFilters} type="button" name="color" data-color={col} className={`${col === color ? 'btn-color active-color':'btn-color'}`} style={{backgroundColor:col}}>
                                            {col === color ? <FaCheck/> : null}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <h5>Price</h5>
                        <p>Rs.{price}</p>
                        <input type="range" name="price" min={min_price} max={max_price} value={price} onChange={updateFilters}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="shipping">Free Shipping</label>
                        <input name="freeShipping" type="checkbox" value={freeShipping} onChange={updateFilters}></input>
                    </div>
                </form>
                <button type="button" onClick={clearFilters} className="clear-btn">Clear Filters</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .form-control{
        margin-bottom:15px;
        h5{
            color:rgb(27, 27, 31);
            font-size:20px;
            margin:0;
            margin-bottom:10px;
        }
    }
    .clear-btn{
        background-color:red;
        color:white;
        font-size:18px;
        border:none;
        border-radius:5px;
        padding:5px 10px;
    }
    .search{
        padding:10px;
        border:none;
        background-color:rgb(190, 211, 190);
        border-radius:5px;
        margin-top:10px;
        color:green;
        font-size:15px;
    }
    .search::placeholder{
        color:green;
        letter-spacing:0.8px;
    }
    .btn-cat{
        display:block;
        border:none;
        background:transparent;
        color:rgb(109, 109, 186);
        padding:7px 0px;
        text-transform:capitalize;
        font-size:15px;
    }
    .btn-all{
        border:none;
        background:transparent;
        color:rgb(109, 109, 186);
        margin:0;
        font-size:18px;
    }
    .active-cat{
        border-bottom:1px solid red;
    }

    select{
        border:none;
        background-color:rgb(190, 211, 190);
        padding:5px;
        border-radius:5px;
    }
    .btn-color{
        width:20px;
        height:20px;
        border:none;
        border-radius:50%;
        margin-right:5px;
        opacity:0.5;
        display:flex;
        align-items:center;
        justify-content:center;
        svg{
            color:white;
            font-size:0.5rem;
        }
    }
    label{
        color:rgb(27, 27, 31);
        font-size:20px;
        margin:0;
        margin-right:10px;
    }
    .active-color:{
        opacity:1
    }
    .colors{
        display:flex;
    }
    @media (min-width:768px){
        .content{
            position:sticky;
            top:1rem;
        }
    }
    
`
export default Filter;
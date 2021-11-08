import React, { useState, useEffect } from "react"
import styled from "styled-components"
import heroBcg from '../assets/heroBcg.jpg'
import { FaUser, FaMobileAlt } from 'react-icons/fa'
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri'
import { IoMdMail } from 'react-icons/io'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import { url } from '../utils/constants'
import LoadingSmall from '../Components/LoadingSmall'

function Signup() {
    const history = useHistory()
    const [showError, setShowError] = useState(false)
    const [showProgress, setProgress] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: "", email: "", mobileNumber: "", password: "", repassword: "", remember: false
    })
    const { username, email, mobileNumber, password, repassword, remember } = userDetails
    useEffect(() => {
        return () => {
            window.location.reload()
        }
    }, [])

    function toggleError() {
        setShowError(showError => !showError)
    }

    function toggleProgress() {
        setProgress(showProgress => !showProgress)
    }

    function changeDetails(e) {
        let name = e.target.name
        if (name === "remember") {
            setUserDetails({ ...userDetails, [name]: e.target.checked })
        }
        else {
            setUserDetails({ ...userDetails, [name]: e.target.value })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        toggleProgress()
        if (showError) {
            toggleError()
        }
        if (password === repassword) {
            axios.post(url + "signup", {
                userName: username,
                email: email,
                mobileNumber: mobileNumber,
                password: password
            }).then((res) => {
                history.push({ pathname: "/login" })
            })
                .catch((error) => {
                    toggleError()
                    toggleProgress()
                })
        } else {

        }
    }
    return (
        <Wrapper className="section section-center">
            <div className="signup-container">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <FaUser />
                        <input type="text" name="username" placeholder="User Name" required value={username} onChange={changeDetails}></input>
                    </div>
                    <div className="form-control">
                        <IoMdMail />
                        <input type="email" name="email" placeholder="Your Email" required value={email} onChange={changeDetails}></input>
                    </div>
                    <div className="form-control">
                        <FaMobileAlt />
                        <input type="text" name="mobileNumber" placeholder="Your Mobile Number" required value={mobileNumber} onChange={changeDetails}></input>
                    </div>
                    <div className="form-control">
                        <RiLockPasswordFill />
                        <input type="password" name="password" placeholder="Password" required value={password} onChange={changeDetails} minLength="4"></input>
                    </div>
                    <div className="form-control">
                        <RiLockPasswordLine />
                        <input type="password" name="repassword" placeholder="Repeat your Password" value={repassword} onChange={changeDetails} minLength="4"></input>
                    </div>
                    <div className="form-checkbox">
                        <input type="checkbox" name="remember" value={remember} onChange={changeDetails}></input>
                        <label htmlFor="remeber">I agree all statements in Terms of Service</label>
                    </div>
                    {
                        showError &&
                        <label className="invalid-text" hidden={false}>Something went wrong</label>
                    }
                    {
                        showProgress ? <LoadingSmall /> :
                            <button type="submit">Sign up</button>
                    }
                </form>
            </div>
            <div className="image-container">
                <img src={heroBcg} alt="herobcg"></img>
                <Link to="/login">I am already a member</Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:grid;
    grid-template-columns:1fr;
    row-gap:3rem;
    min-height:60vh;
    width:50vw;
    .image-container{
        img{
            width:100%;
            height:350px;
            border-radius:10px;
            margin-bottom:10px;
        }
        a{
            display:flex;
            justify-content:center;
            color:rgb(5, 5, 26);
            letter-spacing:1px;
            text-decoration:underline;
        }
    }
    .invalid-text{
        color:rgb(255, 0, 0);
        display:flex;
        align-items:center;
        margin-bottom:30px;
    }
    .signup-container{
        h1{
            color:rgb(5, 5, 26);
            letter-spacing:1px;
            margin:0;
            margin-bottom:40px;
            font-weight:bolder;
            font-size:40px;
        }
        form{
            .form-control{
                margin-bottom:30px;
                position:relative;
                input{
                    width:80%;
                    border:none;
                    background:transparent;
                    font-size:17px;
                    padding-left:30px;
                    padding-bottom:10px;
                    border-bottom:1px solid rgb(130, 120, 120);
                }
                svg{
                    position:absolute;
                    top:2px;
                }

                input:focus{
                    outline:none;
                    border-bottom:1px solid black;
                }

                input:focus::placeholder{
                    color:black;
                }
                input:-webkit-autofill {
                    -webkit-background-clip: text;
                }
            }

            .form-checkbox{
                display:flex;
                align-items:center;
                margin-bottom:40px;
                label{
                    margin-left:15px;
                }
            }
            button{
                border:none;
                background-color:rgb(189, 86, 86);
                color:white;
                padding:10px 25px;
                border-radius:5px;
                font-size:17px;
            }
            button:hover{
                background-color:rgb(99, 174, 99);
            }
        }
    }
    @media (min-width:992px){
        width:95vw;
        grid-template-columns:1fr 1fr;
        column-gap:100px;
        align-items:center;
    }
`

export default Signup
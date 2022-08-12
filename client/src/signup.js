import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./signup.css"
const Signup =()=>{
  const navigate=useNavigate()
  const [signupState, setSignupState] = useState({email: "", password: ""})
    const handleUserAdd = ()=> {
        console.log(signupState);
        axios({
            url: "http://localhost:3001/signup",
            method: "POST",
            headers: {
            },
            data: {email: signupState.email, password: signupState.password}
        }).then((res)=> {
            console.log(res)
        }).catch((err)=> {
            console.log(err)
        })
        navigate("/")
    }
    return(
    <>
    <div className="container">
        <img src={Logo} alt="elipse-up" className="elipse-up"></img>
        <img src={logo} alt="elipse-down" className="elipse-down"></img>
        <div className="container-2">
          <img src={Box} alt="box" className="box-down"></img>
          <img src={Box} alt="box" className="box-up"></img>
          <div className="logo-1">
            LOGO
          </div>
          <div className="tittle-1">
            Create New Account
          </div>
          <input type="email" placeholder="User Id" className="email-1" onChange={(e)=> {setSignupState({...signupState, email: e.target.value})}} ></input>
          <input type="password" placeholder="password" className="password-1" onChange={(e)=> {setSignupState({...signupState, password: e.target.value})}} ></input>
          <input type="confrim-password" placeholder="confrim-password" className="confrim-password-1"></input>
          <button className="signin-1" onClick={handleUserAdd} >Sign in</button>
        </div>
    </div>
    </>
    
  );
}
export default Signup;
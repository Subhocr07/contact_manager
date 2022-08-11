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
    <div className="elipise_up">
      <img src={Logo} alt="elipse"></img>
      </div>
      
      <div className="container-1">
        <img src={Box} alt="box" className="box"></img>
        <h1>LOGO</h1>
        <h3>CREATE NEW ACCOUNT</h3>
        <form>
        <input type="email" placeholder="Mail Id" className="mailid" id="email" onChange={(e)=> {setSignupState({...signupState, email: e.target.value})}}></input>
        <input type="password" placeholder="password" className="password-2" id="password"  onChange={(e)=> {setSignupState({...signupState, password: e.target.value})}}></input>
        <input type="password" placeholder="confrim_password" className="confrim_password" id="confrim_passowrd"></input>
        </form>
        <button className="button" onClick={handleUserAdd} >signin</button>
        <img src={Box} alt="box" className="box-1"></img>
      </div>
      <div className="elipise_down">
      <img src={logo} alt="elipse"></img>
      </div>
      
    </div>
    </>
    
  );
}
export default Signup;
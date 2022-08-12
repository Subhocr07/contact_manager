import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import { useState } from "react";
import axios from "axios";
import "./login.css"
import { useNavigate } from "react-router-dom"
const Login =()=>{
  const navigate=useNavigate()
  const Signup =()=>{
    navigate("./signup")
  }
  
  const [login, setLogin] = useState({email: "", password: ""})
  const handleLogin = ()=> {
      axios({
          url: "http://localhost:3001/login",
          method: "POST",
          headers: {
          },
          data: {email: login.email, password: login.password}
      }).then((loginData)=> {
         localStorage.setItem("authorization", loginData.data.authToken);
      }).catch((err)=> {
          console.log(err)
      })
      navigate("/dashboard")
  }
    return(
    <>
     <div className="container">
        <img src={Logo} alt="elipse-up" className="elipse-up"></img>
        <img src={logo} alt="elipse-down" className="elipse-down"></img>
        <div className="container-2">
          <img src={Box} alt="box" className="box-down"></img>
          <img src={Box} alt="box" className="box-up"></img>
          <div className="logo">
            LOGO
          </div>
          <div className="tittle">
            Enter your credientials to access your account
          </div>
          <input type="email" placeholder="User Id" className="email"onChange={(e)=> {setLogin({...login, email: e.target.value})}} ></input>
          <input type="password" placeholder="password" className="password" onChange={(e)=> {setLogin({...login, password: e.target.value})}} ></input>
          <button className="signin" onClick={handleLogin}>Sign in</button>
          <a href={"./signup"} className="signup" onClick={Signup}>Sign Up</a>
        </div>
    </div>
    </>
    
  );
}
export default Login;
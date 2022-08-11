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
        <h3 className="tittle">Enter your credientials to access your account</h3>
        <form>
        <input type="email" placeholder="Mail Id" className="mailid" onChange={(e)=> {setLogin({...login, email: e.target.value})}} ></input>
        <input type="password" placeholder="password" className="password" onChange={(e)=> {setLogin({...login, password: e.target.value})}} ></input>
        </form>
        <button className="signin" onClick={handleLogin}>signin</button>
        <a href={"./signup"} onClick={Signup}>signup</a>
        <img src={Box} alt="box" className="box-1"></img>
      </div>
      <div className="elipise_down">
      <img src={logo} alt="elipse"></img>
      </div>
      
    </div>
    </>
    
  );
}
export default Login;
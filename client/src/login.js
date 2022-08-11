import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import "./login.css"
import { useNavigate } from "react-router-dom"
const Login =()=>{
    const Signup =()=>{
        const navigate = useNavigate()
        return(
        navigate("/signup")
        )
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
        <input type="email" placeholder="Mail Id" className="mailid" ></input>
        <input type="password" placeholder="password" className="password" ></input>
        </form>
        <button className="signin">signin</button>
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
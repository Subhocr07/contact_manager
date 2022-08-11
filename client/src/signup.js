import Logo from "./asserts/elipise.png"
import logo from "./asserts/Ellipse 32elipise_down.png"
import Box from "./asserts/box.png"
import { useNavigate } from "react-router-dom"
import "./signup.css"
const Signup =()=>{
    const Signin =()=>{
        const navigate = useNavigate();
        return (
             navigate("/login")
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
        <h3>CREATE NEW ACCOUNT</h3>
        <form>
        <input type="email" placeholder="Mail Id" className="mailid" ></input>
        <input type="password" placeholder="password" className="password-2" id="password"></input>
        <input type="password" placeholder="confrim_password" className="confrim_password" id="confrim_passowrd"></input>
        </form>
        <button className="button" onClick={Signin} >signin</button>
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
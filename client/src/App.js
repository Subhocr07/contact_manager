import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Login from "./login";
import Signup from "./signup"

function App() {
return (
  <>
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<Login/>}></Route>
  <Route exact path ="/signup" element={<Signup/>}></Route>
  <Route exact path ="/login"  element={<Login/>}></Route>
  </Routes>
  </BrowserRouter>
  </>
)
}

export default App;

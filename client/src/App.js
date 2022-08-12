import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Login from "./login";
import Signup from "./signup";
import Fileupload from "./components/fileUpload.jsx";

function App() {
return (
  <>
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<Login/>}></Route>
  <Route exact path ="/signup" element={<Signup/>}></Route>
  <Route exact path ="/import"  element={<Fileupload/>}></Route>
  </Routes>
  </BrowserRouter>
  </>
)
}

export default App;

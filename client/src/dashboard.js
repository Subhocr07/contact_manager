import "./dashboard.css"
import Vector from "./asserts/Vectorpng.png"
import Vector_1 from "./asserts/Vectorvector-1.png"
import Vector_2 from "./asserts/Vector-1.png"
import Vector_3 from "./asserts/Vector.png"

function Dashboard() {
  return (
    <div className="post">
    <div className="sidebar">
      <div className="logo-2">
        LOGO
      </div>
      <div className="Dashboard">
        <img src={Vector} alt="alt" className="vector"></img>
        <div className="Dashboard-1">Dashboard</div>
      </div>
      <div className="Total-contacts">
        <img src={Vector_1} alt = "vector-1" className="vector-1"></img>
        <div className="Total-contacts-1">Total Contacts</div>
        <img src={Vector_2} alt ="vector-2" className="vector-2"></img>

      </div>
      <div className="Logout">
        <img src={Vector_3} alt="Logout" className="Logout-1"></img>
        <div className="Logout-2">Logout</div>
      </div>

    </div>
    <div className="Header">
      <div className="tittle-2">
        Total Contacts
        </div>
        <input type="search" placeholder="Search by EmailId..." className="Searchbar"></input>

    </div>

    
    <div className="table">
      
    </div>
   </div>
    
  );
}

export default Dashboard;

import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar(props) {
  return (
    <nav className="glass" style={{
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Logo width="120" color="black" />
      </Link>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
        <Link to="/" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link" style={{ marginRight: 0 }}>
          Cart ({props.cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

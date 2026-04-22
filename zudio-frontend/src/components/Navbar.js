import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav style={{
      padding: "15px",
      backgroundColor: "black",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>ZUDIO</h2>
      <div>
        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
          Login
        </Link>
        <Link to="/" style={{marginRight: "15px", color: "white", textDecoration: "none"}}>
          Home
        </Link>

        <Link to="/" style={{marginRight: "15px", color: "white", textDecoration: "none"}}>
          Products
        </Link>

        <Link to="/cart" style={{color: "white", textDecoration: "none"}}>
          Cart ({props.cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

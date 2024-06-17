import { Link, useNavigate } from "react-router-dom";
import "../Nav/Nav.css";
import { useContext } from "react";
import AuthContext from "../SignupProvider/Signinprovider";
import CartButton from "../Cart/CartButton";
const Nav = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isloggedin;
  const navigate = useNavigate();

  const handleLogout = () => {
    authCtx.logout();
    navigate("/signin");
  };

  return (
    <div className="nav-component">
       
      <ul className="All_routing">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/signin">Signin</Link>
          </li>
        )}
        
        <CartButton />
        <button onClick={handleLogout} className="logout-button-top">
          LOGOUT
        </button>
      </ul>
    </div>
  );
};

export default Nav;

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./navbar.css";
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user } = useUser();
  const location = useLocation();

    if (!user) {
      return (
          <div>
              <p>Loading...</p>
          </div>
      );
  }

  return (
    <div className="navigation-bar">
      <div className="navbar">
        <div>
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="nav">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link> {/* Correct path */}
            </li>
            <li className={location.pathname === "/location" ? "active" : ""}>
              <Link to="/location">Location</Link>
            </li>
            <li className={location.pathname === "/about-us" ? "active" : ""}>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <ul>
            <li>
              <NotificationsIcon
                className="user-icon"
                style={{ color: "white", fontSize: "32px" }}
              />
            </li>
            <li>
              <AccountCircleIcon
                className="user-icon"
                style={{ color: "white", fontSize: "32px" }}
              />
            </li>
            <Link to={user.role === 'admin' ? '/admin' : `/user/${user._id}`}className='navbar-link'>{user.username}</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

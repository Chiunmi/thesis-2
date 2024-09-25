import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navigation-bar">
      <div className="navbar">
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
            <Link to="/user"> Neil Christian Gabriel </Link>{" "}
            {/* Correct path */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

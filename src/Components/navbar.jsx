import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircularProgress from "@mui/material/CircularProgress";

import logo from "../assets/logo.png";
import "./navbar.css";
import { useUser } from "../context/UserContext";

const fetchNotifications = async () => {
  const response = await axios.get("/notification");
  return response.data;
};

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const handleNotificationClick = async (notif) => {
    try {
      await axios.post(`/notification/${notif._id}`);

      switch (notif.documentType) {
        case "post":
          navigate(`/post/${notif.documentId}`);
          break;
        case "request":
          navigate(`/request/${notif.documentId}`);
          break;
        case "event":
          navigate(`/event/${notif.documentId}`);
          break;
        default:
          console.error("Unknown document type");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

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
              <Link to="/">Home</Link>
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
            <li
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ position: "relative" }}
            >
              <NotificationsIcon
                className="user-icon"
                style={{ color: "white", fontSize: "32px", cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="notification-dropdown">
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : isError ? (
                    <p>Error loading notifications</p> // Error message
                  ) : notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notif) => (
                        <li
                          key={notif._id}
                          style={{ opacity: notif.isRead ? 0.5 : 1 }}
                        >
                          <Link
                            to="#"
                            onClick={() => handleNotificationClick(notif)}
                          >
                            <p>{notif.title}</p>
                            <small>
                              {new Date(notif.timestamp).toLocaleString()}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </li>
            <li>
              <AccountCircleIcon
                className="user-icon"
                style={{ color: "white", fontSize: "32px" }}
              />
            </li>
            <Link
              to={
                user.role === "admin" || user.role === "staff"
                  ? "/admin"
                  : `/user/${user._id}`
              }
              className="navbar-link"
            >
              {user.username}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

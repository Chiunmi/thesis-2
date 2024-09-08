import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import logo from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI CircularProgress
import "./navbar.css";
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const fetchNotifications = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('/notification');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleNotificationClick = async (notif) => {
    try {
      // Mark notification as read
      console.log('notif', notif);
      await axios.post(`/notification/${notif._id}`);

      switch (notif.documentType) {
        case 'post':
          navigate(`/post/${notif.documentId}`);
          break;
        case 'request':
          navigate(`/request/${notif.documentId}`);
          break;
        case 'event':
          navigate(`/event/${notif.documentId}`);
          break;
        default:
          console.error('Unknown document type');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

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
            <li onClick={() => setShowDropdown(!showDropdown)} style={{ position: 'relative' }}>
              <NotificationsIcon
                className="user-icon"
                style={{ color: "white", fontSize: "32px", cursor: 'pointer' }}
                onClick={() => fetchNotifications()}
              />
              {showDropdown && (
                <div className="notification-dropdown">
                  {loading ? (
                    <CircularProgress style={{ color: 'white' }} /> // Show loading spinner
                  ) : notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notif) => (
                        <li key={notif._id} style={{ opacity: notif.isRead ? 0.5 : 1 }}>
                          <Link to="#" onClick={() => handleNotificationClick(notif)}>
                            <p>{notif.title}</p>
                            <small>{new Date(notif.timestamp).toLocaleString()}</small>
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
            <Link to={user.role === 'admin' ? '/admin' : `/user/${user._id}`} className='navbar-link'>{user.username}</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

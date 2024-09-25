import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./left.css";
import logo from "../assets/logo.png";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import LogoutIcon from "@mui/icons-material/Logout";

const Left = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/services", icon: MedicalServicesIcon, label: "Services" },
    { path: "/schedules", icon: CalendarMonthRoundedIcon, label: "Schedules" },
    { path: "/telemed", icon: VideocamRoundedIcon, label: "Telemed" },
    { path: "/request-forms", icon: FolderRoundedIcon, label: "Request Forms" },
    { path: "/events", icon: EventAvailableRoundedIcon, label: "Events" },
    {
      path: "/health-tips",
      icon: MonitorHeartRoundedIcon,
      label: "Health Tips",
    },
    { path: "/archive", icon: ArchiveRoundedIcon, label: "Archive" },
  ];

  return (
    <div className="left">
      <div className="navbar-logo">
        <img src={logo} alt="" className="logo" />
      </div>
      <div className="sidebar">
        <ul className="sidebar-list">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <item.icon
                  className="left-icon"
                  style={{ color: "#8A8A8A", fontSize: "24px" }}
                />
                {/* Only show label if not active or screen width is above 1000px */}
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="logout">
          <li>
            <Link to="/login">
              <LogoutIcon
                className="left-icon"
                style={{ color: "#8A8A8A", fontSize: "24px" }}
              />
              <span className="label">Logout</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Left;

import { useLocation, Link } from "react-router-dom";
import "./left.css";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import LogoutIcon from "@mui/icons-material/Logout";

const Left = () => {
  const location = useLocation();

  return (
    <div className="left">
      <div className="sidebar">
        <ul className="sidebar-list">
          <li className={location.pathname === "/services" ? "active" : ""}>
            <Link to="/services">
              <MedicalServicesIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Services
            </Link>
          </li>
          <li className={location.pathname === "/schedules" ? "active" : ""}>
            <Link to="/schedules">
              <CalendarMonthRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Schedules
            </Link>
          </li>
          <li className={location.pathname === "/telemed" ? "active" : ""}>
            <Link to="/telemed">
              <VideocamRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Telemed
            </Link>
          </li>
          <li
            className={location.pathname === "/request-forms" ? "active" : ""}
          >
            <Link to="/request-forms">
              <FileCopyRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Request Forms
            </Link>
          </li>
          <li className={location.pathname === "/events" ? "active" : ""}>
            <Link to="/events">
              <EventAvailableRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Events
            </Link>
          </li>
          <li className={location.pathname === "/health-tips" ? "active" : ""}>
            <Link to="/health-tips">
              <MonitorHeartRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Health Tips
            </Link>
          </li>
          <li className={location.pathname === "/archive" ? "active" : ""}>
            <Link to="/archive">
              <ArchiveRoundedIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />
              Archive
            </Link>
          </li>
        </ul>

        <div className="logout">
          <li>
            {" "}
            <Link to="/login">
              <LogoutIcon
                className="left-icon"
                style={{ color: "8A8A8A", fontSize: "24px" }}
              />{" "}
              Logout
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Left;

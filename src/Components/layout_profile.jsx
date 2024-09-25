import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Left from "./left";
import "./layout.css";

function ProfileLayout() {
  return (
    <div className="profile-layout-container">
      <Navbar className="navbar" />
      <div className="profile-content-area">
        <Left className="sidebar-left" />
        <div className="profile-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;

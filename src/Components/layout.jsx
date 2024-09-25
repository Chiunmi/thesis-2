import React from "react";
import { Outlet } from "react-router-dom";
import Left from "./left";
import Navbar from "./Navbar";
import Right from "./right";
import "./layout.css";

function Layout() {
  return (
    <div className="layout-container">
      <Navbar className="navbar" />
      <div className="content-area">
        <Left className="sidebar-left" />
        <div className="main-content">
          <Outlet />
        </div>
        <Right className="sidebar-right" />
      </div>
    </div>
  );
}

export default Layout;

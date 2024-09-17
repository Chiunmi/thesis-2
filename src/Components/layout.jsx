import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useUser } from "../context/UserContext";
import "./layout.css";
import Left from "./left";
import Navbar from "./Navbar";
import Right from "./right";

function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      if (response.data) {
        setUser(response.data);
        toast.success("Authorized!");
      }
    } catch (err) {
      toast.error(err.response.data.error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) fetchData();
  }, [navigate, user]);

  return (
    <div className="layout-container">
      <Navbar className="navbar" />
      <div className="content-area">
        <Left className="sidebar-left" />
        <div className="main-content">
          <Outlet /> {/* This is where nested routes will be rendered */}
        </div>
        <Right className="sidebar-right" />
      </div>
    </div>
  );
}

export default Layout;

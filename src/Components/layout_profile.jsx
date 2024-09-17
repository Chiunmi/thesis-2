import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useUser } from "../context/UserContext";
import Navbar from "./Navbar";
import Left from "./left";

function ProfileLayout() {
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
    <div>
      <Navbar />
      <Left />

      <div>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </div>
    </div>
  );
}

export default ProfileLayout;

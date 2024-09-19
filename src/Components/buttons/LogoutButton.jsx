import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      console.log("logout clicked");
      await axios.get("/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Error logging out:", err);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

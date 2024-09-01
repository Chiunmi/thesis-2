import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Left from "./left";

function ProfileLayout() {
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

import { Outlet } from "react-router-dom";
import Left from "./left";
import Navbar from "./Navbar";
import Right from "./right";

function Layout() {
  return (
    <div>
      <Navbar />
      <Left />
      <Right />
      <div>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </div>
    </div>
  );
}

export default Layout;

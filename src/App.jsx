import { Route, Routes } from "react-router-dom";
import "./App.css";

// Import your components
import Archive from "./Sidebar/archive";
import Events from "./Sidebar/events";
import HealthTips from "./Sidebar/health_tips";
import RequestForms from "./Sidebar/request_forms";
import Schedules from "./Sidebar/schedules";
import Services from "./Sidebar/services";
import Telemed from "./Sidebar/telemed";
import Home from "./NavBar_Tabs/Home/home";
import Location from "./NavBar_Tabs/Location/location";
import AboutUs from "./NavBar_Tabs/About Us/about-us";
import StudentProfile from "./NavBar_Tabs/Profile/student-profile";
import NotFound from "./not-found";
import Login from "./Components/login";
import Layout from "./Components/Layout"; // Main layout
import ProfileLayout from "./Components/layout_profile";
import AdminProfile from "./NavBar_Tabs/Profile/admin_profile";
import Manage from "./NavBar_Tabs/Profile/manage";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes that use the Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/telemed" element={<Telemed />} />
          <Route path="/request-forms" element={<RequestForms />} />
          <Route path="/events" element={<Events />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/location" element={<Location />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/user" element={<StudentProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/manage" element={<Manage />} />
        </Route>

        {/* Routes that use the Profile Layout */}
        <Route element={<ProfileLayout />}></Route>

        {/* Routes that do not use any layout */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

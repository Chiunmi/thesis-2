import { Route, Routes } from "react-router-dom";
import "./App.css";

// Import your components
import Archive from "./Sidebar/archive";
import Events from "./Sidebar/Event/events";
import HealthTips from "./Sidebar/health_tips";
import RequestForms from "./Sidebar/RequestForms/request_forms";
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
import HealthRecord from "./NavBar_Tabs/Profile/health_record";
import StudentAbsenceForm from "./Sidebar/RequestForms/student-absence-form";
import MedicalLeaveForm from "./Sidebar/RequestForms/medical-leave-form";
import SpecialLeaveForm from "./Sidebar/RequestForms/special-leave-form";
import EditStockPage from "./NavBar_Tabs/Profile/edit-stock";
import AppointmentRequestForm from "./Sidebar/RequestForms/appointment-request-form";
import MedicalRecordRequestForm from "./Sidebar/RequestForms/medical-record-request-form";
import ParentalConsentForm from "./Sidebar/RequestForms/parental-consent-form";
import ReferralForm from "./Sidebar/RequestForms/referral-form";
import TelehealthAppointmentRequestForm from "./Sidebar/RequestForms/telehealth-form";

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
          <Route
            path="/appointment-request-form"
            element={<AppointmentRequestForm />}
          />

          <Route path="/medical-leave-form" element={<MedicalLeaveForm />} />
          <Route
            path="/medical-record-request-form"
            element={<MedicalRecordRequestForm />}
          />
          <Route
            path="/parental-consent-form"
            element={<ParentalConsentForm />}
          />
          <Route path="/referral-form" element={<ReferralForm />} />
          <Route
            path="/student-absence-form"
            element={<StudentAbsenceForm />}
          />
          <Route path="/special-leave-form" element={<SpecialLeaveForm />} />
          <Route
            path="/telehealth-form"
            element={<TelehealthAppointmentRequestForm />}
          />

          <Route path="/events" element={<Events />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="/location" element={<Location />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        {/* Routes that use the Profile Layout */}
        <Route element={<ProfileLayout />}>
          <Route path="/archive" element={<Archive />} />
          <Route path="/user" element={<StudentProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/edit-stock" element={<EditStockPage />} />
          <Route path="/health-record" element={<HealthRecord />} />
        </Route>

        {/* Routes that do not use any layout */}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

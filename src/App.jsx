// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Login Pages
import UserLogin from "./component/Page/User login/Login/UserLogin.jsx";
import DirectorLogin from "./component/Page/Directer/Login/DirectorLogin.jsx";
import ITLogin from "./component/Page/ITteam login/Login/ITLogin.jsx";

// Auth Pages
import Register from "./component/Page/User login/Register/Register.jsx";
import OTP from "./component/Page/User login/Forget password/OTP.jsx";
import ForgotPassword from "./component/Page/User login/Forget password/Forget.jsx";

// User Dashboard Pages
import Home from "./component/Page/User login/User-Deshbord/Home.jsx";
import DashboardLayout from "./component/Page/User login/User-Deshbord/DashboardLayout.jsx";
import Booking from "./component/Page/User login/User-Deshbord/Booking.jsx";
import AvailableSchedule from "./component/Page/User login/User-Deshbord/AvailableSchedule.jsx";
import History from "./component/Page/User login/User-Deshbord/History.jsx";
import Remarks from "./component/Page/User login/User-Deshbord/Remarks.jsx";
import Feedback from "./component/Page/User login/User-Deshbord/Feedback.jsx";

// Director Dashboard Pages
import DirDashboardLayout from "./component/Page/Directer/Director-Dashboard/DirDashboardLayout.jsx";
import DirHome from "./component/Page/Directer/Director-Dashboard/DirHome.jsx";
import DirRequests from "./component/Page/Directer/Director-Dashboard/DirRequests.jsx";
import DirHistory from "./component/Page/Directer/Director-Dashboard/DirHistory.jsx";
import DirRemarks from "./component/Page/Directer/Director-Dashboard/DirRemarks.jsx";
import DirFeedback  from "./component/Page/Directer/Director-Dashboard/DirFeedback.jsx";
import DirFAQs from "./component/Page/Directer/Director-Dashboard/DirFAQ.jsx";
import DirContact from "./component/Page/Directer/Director-Dashboard/DirContact.jsx";

// IT Team Dashboard Pages
import ItDashboardLayout  from "./component/Page/ITteam login/ITteam-Dashboard/ITDashboardLayout.jsx";
import ITHome from "./component/Page/ITteam login/ITteam-Dashboard/ITHome.jsx";
// import ReportsSection from "./component/Page/ITteam login/ITteam-Dashboard/ReportsSection.jsx";
// import RequestsSection from "./component/Page/ITteam login/ITteam-Dashboard/RequestsSection.jsx";
// import UserManagementSection from "./component/Page/ITteam login/ITteam-Dashboard/UserManagementSection.jsx";
// import SystemSettingsSection from "./component/Page/ITteam login/ITteam-Dashboard/SystemSettingsSection.jsx";
// import ActivityHistorySection from "./component/Page/ITteam login/ITteam-Dashboard/ActivityHistorySection.jsx";
// import TicketReviewSection from "./component/Page/ITteam login/ITteam-Dashboard/TicketReviewSection.jsx";
// import ContactSupportSection from "./component/Page/ITteam login/ITteam-Dashboard/ContactSupportSection.jsx";
// import KnowledgeBaseSection from "./component/Page/ITteam login/ITteam-Dashboard/KnowledgeBaseSection.jsx";

import "./App.css";
import ITForgot from "./component/Page/ITteam login/Forget pass/ITForget.jsx";
import DirecterForgot from "./component/Page/Directer/Forget password/DirecterForget.jsx";
import DirecterRegister from "./component/Page/Directer/Resister/DirecterRegister.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Default Redirect to User Login */}
        <Route path="/" element={<Navigate to="/login/user" />} />

        {/* 🔐 Login Pages */}
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/director" element={<DirectorLogin />} />
        <Route path="/login/it" element={<ITLogin />} />

        {/* 🧾 Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-Directer" element={<DirecterRegister />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-it" element={<ITForgot />} />
        <Route path="/forgot-password-Directer" element={<DirecterForgot />} />

        {/* 📊User  Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/available" element={<AvailableSchedule />} />
        <Route path="/history" element={<History />} />
        <Route path="/remarks" element={<Remarks />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Director Dashboard Pages */}
        <Route path ="/dir-dashboard" element={<DirDashboardLayout />}/>
        <Route path="/director-home" element={<DirHome />} />   
        <Route path="/director-requests" element={<DirRequests/>}/>
        <Route path="/director-history" element={<DirHistory/>}/>
        <Route path="/director-remarks" element={<DirRemarks/>} />
        <Route path="/director-feedback" element={<DirFeedback/>} />
        <Route path="/director-faqs" element={<DirFAQs/>} />
        <Route path="/director-contact" element={<DirContact/>} />

        {/* IT Team Dashboard Pages */}
        <Route path="/it-dashboard" element={<ItDashboardLayout/>} />
        <Route path="/it-home" element={<ITHome />} />
        {/* <Route path="/it-reports" element={<ReportsSection/>} />
        <Route path="/it-requests" element={<RequestsSection/>} />
        <Route path="/it-users" element={<UserManagementSection/>} />
        <Route path="/it-settings" element={<SystemSettingsSection/>} />
        <Route path="/it-history" element={<ActivityHistorySection/>} />
        <Route path="/it-review" element={<TicketReviewSection/>}/>
        <Route path="/it-contact" element={<ContactSupportSection/>} />
        <Route path="/it-faq" element={<KnowledgeBaseSection/>} /> */}

         </Routes>
    </Router>
  );
}

export default App;

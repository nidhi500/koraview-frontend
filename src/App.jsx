import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import Explore from "./pages/Explore";
import Nearby from "./pages/Nearby";
import CulturalCalendar from "./pages/CulturalCalendar";
import Community from "./pages/Community";
import Homestays from "./pages/Homestays";
import Handicrafts from "./pages/Handicrafts";
import Tours from "./pages/LocalTours";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
<Route path="/nearby" element={<Nearby />} />
<Route path="/calendar" element={<CulturalCalendar />} />
<Route path="/community" element={<Community />} />
<Route path="/homestays" element={<Homestays />} />
<Route path="/handicrafts" element={<Handicrafts />} />
<Route path="/tours" element={<Tours />} />

          <Route path="/login" element={<Login />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;  // 👈 make sure this line exists!

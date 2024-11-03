import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import About from "./components/About";
import Home from "./components/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardLayout from "./pages/alumini/DashboardLayout";
import UserProfile from "./pages/alumini/UserProfile";
import AluminiUi from "./pages/alumini/Dashboad";
import Jobs from "./pages/alumini/Jobs";
import Events from "./pages/alumini/Events";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { Scrollbars } from "react-custom-scrollbars";
import ForgotPassword from "./components/ForgotPassword";
// import AluminiUi from "./components/Aluminiui";

export default function App() {
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("http://localhost:4000"); // Update to port 4000
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <Scrollbars
        style={{ height: "100vh" }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "#717E8E",
              borderRadius: "10px",
            }}
          />
        )}
      >
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/aluminiUi" element={<About />} />

          {/* User Protected Routes */}
          <Route
            path="/alumniui"
            element={
                  <AluminiUi />
            }
          />
          <Route
            path="/user/jobs"
            element={
            
                  <Jobs />

            }
          />
          <Route
            path="/user/events"
            element={
                  <Events />
            }
          />
          <Route
            path="/aluminiui"
            element={
              
                  <AluminiUi />
                
              
            }
          />


          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
                <AdminDashboard />

            }
          />
            <Route
            path="/user/profile"
            element={

                  <UserProfile />
            }
          />

        </Routes>
        <ScrollToTop></ScrollToTop>
        <Footer />
      </Scrollbars>
    </>
  );
}

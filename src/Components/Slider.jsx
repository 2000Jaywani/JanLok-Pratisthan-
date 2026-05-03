import React, { useState, useEffect } from "react";
import "./Slider.css";

import {
  FaBars,
  FaUser,
  FaLayerGroup,
  FaFileAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import {
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import axios from "axios";


import { IoSettingsOutline } from "react-icons/io5";

import "react-toastify/dist/ReactToastify.css";

function Slider() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [adminData, setAdminData] =
    useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  const BASE_URL =
    "http://localhost:8080/api/admin";

  const IMAGE_URL =
    "http://localhost:8080/api/images/";

  // ================= CHECK LOGIN =================

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(
      "isAdminLoggedIn"
    );

    if (!isLoggedIn) {
      navigate("/admin", { replace: true });
    } else {
      fetchAdminData();
    }
  }, [navigate]);

  // ================= FETCH ADMIN =================

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/all`
      );

      if (response.data.length > 0) {
        setAdminData(response.data[0]);
      }
    } catch (error) {
      toast.error("Failed to load admin ❌");
    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div className="logout-toast">

          <p>
            Are you sure you want to logout
            your profile?
          </p>

          <div className="logout-toast-actions">

            <button
              className="confirm-logout-btn"
              onClick={() => {
                localStorage.removeItem(
                  "isAdminLoggedIn"
                );

                toast.success(
                  "Logout Successfully 👋"
                );

                navigate("/admin", {
                  replace: true,
                });

                closeToast();
              }}
            >
              Yes
            </button>

            <button
              className="cancel-logout-btn"
              onClick={closeToast}
            >
              No
            </button>

          </div>

        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="layout">

        {/* ================= OVERLAY ================= */}

        {isSidebarOpen && (
          <div
            className="overlay"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
        )}

        {/* ================= SIDEBAR ================= */}

        <aside
          className={`sidebar ${
            isSidebarOpen ? "active" : ""
          }`}
        >

          <div className="logo">

            <FaTimes
              className="close-btn"
              onClick={() =>
                setIsSidebarOpen(false)
              }
            />

          </div>

          {/* ================= ADMIN PROFILE ================= */}

          <div className="admin-profile">

            <img
              src={
                adminData?.image
                  ? `${IMAGE_URL}${adminData.image}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Admin"
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
              }}
            />

            <h4>
              {adminData?.adminFullName ||
                "Admin"}
            </h4>

          </div>

          {/* ================= MENU ================= */}

          <ul className="menu">

            <li
              className={
                activePath === "/slider/user"
                  ? "active"
                  : ""
              }
              onClick={() =>
                navigate("/slider/user")
              }
            >
              <FaUser />
              <span>User</span>
            </li>

            <li
              className={
                activePath ===
                "/slider/section"
                  ? "active"
                  : ""
              }
              onClick={() =>
                navigate("/slider/section")
              }
            >
              <FaLayerGroup />
              <span>Section</span>
            </li>

            <li
              className={
                activePath ===
                "/slider/content"
                  ? "active"
                  : ""
              }
              onClick={() =>
                navigate("/slider/content")
              }
            >
              <FaFileAlt />
              <span>Content</span>
            </li>

           <li
              className={
                activePath ===
                "/slider/setting"
                  ? "active"
                  : ""
              }
              onClick={() =>
                navigate("/slider/setting")
              }
            >
              <IoSettingsOutline  />
              <span>Setting</span>
            </li>     

          </ul>

        </aside>

        {/* ================= MAIN ================= */}

        <div className="main">

          <header className="topbar">

            <FaBars
              className="menu-btn"
              onClick={() =>
                setIsSidebarOpen(
                  !isSidebarOpen
                )
              }
            />

            <h2>Dashboard</h2>

            <button
              className="logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </header>

          {/* ================= PAGE CONTENT ================= */}

          <div className="content">
            <Outlet />
          </div>

        </div>

      </div>
    </>
  );
}

export default Slider;


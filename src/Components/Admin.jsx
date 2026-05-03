import React, { useState } from "react";
import "./Admin.css";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaShieldAlt,
  FaChartLine,
  FaBolt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ VALIDATION
  const validateRegister = () => {
    if (!fullName.trim()) return "Full Name is required";
    if (!email.includes("@")) return "Invalid Email";
    if (phone.length !== 10) return "Phone must be 10 digits";
    if (!image) return "Image is required";
    if (username.length < 4) return "Username must be at least 4 characters";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  // ✅ LOGIN API
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username & Password required ❌");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const res = await axios.post(
        "http://localhost:8080/api/admin/login",
        formData
      );

      toast.success(res.data || "Login Successful ✅");

      // ✅ SAVE LOGIN STATE
      localStorage.setItem("isAdminLoggedIn", "true");

      // ✅ REPLACE HISTORY (IMPORTANT)
      setTimeout(() => {
        navigate("/slider", { replace: true });
      }, 1200);

    } catch (err) {
      toast.error(err.response?.data || "Login Failed ❌");
    }
  };

  // ✅ REGISTER API
  const addAdminUser = async (e) => {
    e.preventDefault();

    const errorMsg = validateRegister();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8080/api/admin/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data || "Registration Successful ✅");

      // clear form
      setFullName("");
      setPhone("");
      setEmail("");
      setUsername("");
      setPassword("");
      setImage(null);

      setIsLogin(true);

    } catch (error) {
      toast.error(error.response?.data || "Registration Failed ❌");
    }
  };

  return (
    <div className="admin-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="auth-wrapper">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="branding">
            <h1>Admin Portal</h1>
            <p className="tagline">
              Smart, Secure & Fast Management System
            </p>
          </div>

          <div className="features">
            <div className="feature">
              <FaShieldAlt />
              <span>Secure Access</span>
            </div>
            <div className="feature">
              <FaBolt />
              <span>Fast Performance</span>
            </div>
            <div className="feature">
              <FaChartLine />
              <span>Analytics Dashboard</span>
            </div>
          </div>

          <div className="social-icons">
            <div className="icon facebook"><FaFacebookF /></div>
            <div className="icon youtube"><FaYoutube /></div>
            <div className="icon instagram"><FaInstagram /></div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="form-box">
          <div className="toggle-buttons">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h2>{isLogin ? "Super Admin Login" : "Create Account"}</h2>

          {isLogin ? (
            <form className="form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>
          ) : (
            <form className="form" onSubmit={addAdminUser}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;























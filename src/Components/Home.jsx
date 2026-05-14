import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    address: "",  
    image: null
  });

  const [users, setUsers] = useState([]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Image Change
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      toast.error("Mobile must be 10 digits");
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email");
      return false;
    }
    if (!formData.gender) {
      toast.error("Select gender");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("City required");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address required");
      return false;
    }
    if (!formData.image) {
      toast.error("Image required");
      return false;
    }
    return true;
  };

  // ✅ SUBMIT (FULL FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("email", formData.email);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("gender", formData.gender);
    data.append("city", formData.city);
    data.append("address", formData.address);

    // 🔥 CORRECT IMAGE FIELD
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:8080/api/users/addUsers", data);

      toast.success("User Registered Successfully ✅");

      // Reset form
      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        city: "",
        address: "",
        image: null
      });

      getUsers();

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data || "Error while saving user ❌");
    }
  };

  // ✅ GET USERS
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/getAllUsers");
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <h3>Free Registration Form</h3>

            <div className="form-group">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                name="mobileNumber"
                placeholder="Mobile"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* ✅ IMAGE INPUT */}
            <div className="form-group">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* VIDEO */}
        <div className="video-card">
          <h2>Watch Introduction</h2>
          <iframe
            src="https://www.youtube.com/embed/bkfgdY_Vzw0"
            title="YouTube video"
          ></iframe>

          <div className="info-box marathi">
            <h3>नोंदणी कशी करावी?</h3>
            <p>
              १) कृपया फॉर्म भरा आणि Submit बटणावर क्लिक करा <br />
              २) पूर्ण नाव आणि मोबाईल क्रमांक अनिवार्य आहे <br />
              फॉर्म भरल्याने आपण अटी व शर्तींना सहमती देता.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

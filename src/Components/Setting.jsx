// Setting.jsx

import React, { useEffect, useState } from "react";
import "./Setting.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import {
  FaUserCircle,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaIdBadge,
  FaSave,
} from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";

function Setting() {

  // ================= STATES =================

  const [adminId, setAdminId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ================= FETCH DATA =================

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/admin/all"
      );

      console.log("FULL API RESPONSE => ", response.data);

      // ================= CHECK RESPONSE =================

      if (!response.data || response.data.length === 0) {
        toast.error("No Admin Data Found ❌");
        return;
      }

      // ================= FIRST ADMIN =================

      const admin = response.data[0];

      console.log("ADMIN OBJECT => ", admin);

      // ================= IMPORTANT =================
      // CHECK YOUR BACKEND FIELD NAME

      setAdminId(admin.id || admin.adminId);

      // ================= SET DATA =================

      setFullName(admin.fullName || "");
      setPhone(admin.phone || "");
      setEmail(admin.email || "");
      setUsername(admin.username || "");
      setPassword(admin.password || "");

      // ================= IMAGE =================

      if (admin.imagePath) {

        setPreviewImage(
          `http://localhost:8080/${admin.imagePath}`
        );

      } else if (admin.image) {

        setPreviewImage(
          `http://localhost:8080/${admin.image}`
        );

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to Fetch Admin Data ❌");
    }
  };

  // ================= IMAGE CHANGE =================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ================= UPDATE =================

  const handleUpdate = async (e) => {

    e.preventDefault();

    console.log("ADMIN ID => ", adminId);

    // ================= CHECK ID =================

    if (!adminId) {
      toast.error("Admin ID is Missing ❌");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);

      // IMAGE
      if (image) {
        formData.append("image", image);
      }

      // ================= UPDATE API =================

      const response = await axios.put(
        `http://localhost:8080/api/admin/update/${adminId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        response.data || "Profile Updated Successfully ✅"
      );

      fetchAdminData();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Update Failed ❌"
      );
    }
  };

  return (

    <div className="setting-container">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="setting-card">

        {/* HEADER */}

        <div className="setting-header">
          <h2>Admin Settings</h2>
          <p>Manage your profile information</p>
        </div>

        {/* PROFILE */}

        <div className="profile-section">

          <div className="profile-image-box">

            {previewImage ? (

              <img
                src={previewImage}
                alt="Profile"
                className="profile-image"
              />

            ) : (

              <FaUserCircle className="default-profile-icon" />

            )}

            {/* CAMERA */}

            <label
              htmlFor="imageUpload"
              className="camera-icon"
            >
              <FaCamera />
            </label>

            <input
              type="file"
              id="imageUpload"
              hidden
              onChange={handleImageChange}
            />

          </div>

        </div>

        {/* FORM */}

        <form
          className="setting-form"
          onSubmit={handleUpdate}
        >

          {/* FULL NAME */}

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          </div>

          {/* PHONE */}

          <div className="input-group">

            <FaPhoneAlt className="input-icon" />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* USERNAME */}

          <div className="input-group">

            <FaIdBadge className="input-icon" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="save-btn"
          >
            <FaSave />
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Setting;

















// // Setting.jsx

// import React, { useEffect, useState } from "react";
// import "./Setting.css";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// import {
//   FaUserCircle,
//   FaUser,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaLock,
//   FaCamera,
//   FaIdBadge,
//   FaSave,
// } from "react-icons/fa";

// import "react-toastify/dist/ReactToastify.css";

// function Setting() {

//   // ================= STATES =================

//   const [adminId, setAdminId] = useState(null);

//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");

//   // ================= FETCH ADMIN DATA =================

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {

//       const response = await axios.get(
//         "http://localhost:8080/api/admin/all"
//       );

//       console.log("Admin API Response =>", response.data);

//       // ================= HANDLE ARRAY RESPONSE =================
//       let adminData = null;

//       if (Array.isArray(response.data)) {
//         adminData = response.data[0];
//       } else {
//         adminData = response.data;
//       }

//       // ================= SET DATA =================

//       if (adminData) {

//         setAdminId(adminData.id);

//         setFullName(adminData.fullName || "");
//         setPhone(adminData.phone || "");
//         setEmail(adminData.email || "");
//         setUsername(adminData.username || "");
//         setPassword(adminData.password || "");

//         // ================= IMAGE =================

//         if (adminData.imagePath) {

//           setPreviewImage(
//             `http://localhost:8080/${adminData.imagePath}`
//           );

//         } else if (adminData.image) {

//           setPreviewImage(
//             `http://localhost:8080/${adminData.image}`
//           );

//         }
//       }

//     } catch (error) {

//       console.log(error);

//       toast.error("Failed to fetch admin data ❌");
//     }
//   };

//   // ================= IMAGE CHANGE =================

//   const handleImageChange = (e) => {

//     const file = e.target.files[0];

//     if (file) {

//       setImage(file);

//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // ================= UPDATE =================

//   const handleUpdate = async (e) => {

//     e.preventDefault();

//     // CHECK ID
//     if (!adminId) {
//       toast.error("Admin ID not found ❌");
//       return;
//     }

//     try {

//       const formData = new FormData();

//       formData.append("fullName", fullName);
//       formData.append("phone", phone);
//       formData.append("email", email);
//       formData.append("username", username);
//       formData.append("password", password);

//       // IMAGE
//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await axios.put(
//         `http://localhost:8080/api/admin/update/${adminId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success(
//         response.data || "Profile Updated Successfully ✅"
//       );

//       fetchAdminData();

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         error.response?.data || "Update Failed ❌"
//       );
//     }
//   };

//   return (
//     <div className="setting-container">

//       <ToastContainer position="top-right" autoClose={2000} />

//       <div className="setting-card">

//         {/* HEADER */}

//         <div className="setting-header">
//           <h2>Admin Settings</h2>
//           <p>Manage your profile information</p>
//         </div>

//         {/* PROFILE IMAGE */}

//         <div className="profile-section">

//           <div className="profile-image-box">

//             {previewImage ? (

//               <img
//                 src={previewImage}
//                 alt="Profile"
//                 className="profile-image"
//               />

//             ) : (

//               <FaUserCircle className="default-profile-icon" />

//             )}

//             {/* CAMERA BUTTON */}

//             <label
//               htmlFor="imageUpload"
//               className="camera-icon"
//             >
//               <FaCamera />
//             </label>

//             <input
//               type="file"
//               id="imageUpload"
//               hidden
//               onChange={handleImageChange}
//             />

//           </div>

//         </div>

//         {/* FORM */}

//         <form
//           className="setting-form"
//           onSubmit={handleUpdate}
//         >

//           {/* FULL NAME */}

//           <div className="input-group">

//             <FaUser className="input-icon" />

//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) =>
//                 setFullName(e.target.value)
//               }
//             />

//           </div>

//           {/* PHONE */}

//           <div className="input-group">

//             <FaPhoneAlt className="input-icon" />

//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={phone}
//               onChange={(e) =>
//                 setPhone(e.target.value)
//               }
//             />

//           </div>

//           {/* EMAIL */}

//           <div className="input-group">

//             <FaEnvelope className="input-icon" />

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//             />

//           </div>

//           {/* USERNAME */}

//           <div className="input-group">

//             <FaIdBadge className="input-icon" />

//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) =>
//                 setUsername(e.target.value)
//               }
//             />

//           </div>

//           {/* PASSWORD */}

//           <div className="input-group">

//             <FaLock className="input-icon" />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//             />

//           </div>

//           {/* BUTTON */}

//           <button
//             type="submit"
//             className="save-btn"
//           >
//             <FaSave />
//             Update Profile
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default Setting;









// // Setting.jsx

// import React, { useEffect, useState } from "react";
// import "./Setting.css";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// import {
//   FaUserCircle,
//   FaUser,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaLock,
//   FaCamera,
//   FaIdBadge,
//   FaSave,
// } from "react-icons/fa";

// import "react-toastify/dist/ReactToastify.css";

// function Setting() {
//   const [id, setId] = useState("");

//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");

//   // ================= FETCH ADMIN DATA =================
//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/admin/all"
//       );

//       // FIRST ADMIN USER
//       const admin = response.data[0];

//       if (admin) {
//         setId(admin.id);
//         setFullName(admin.fullName || "");
//         setPhone(admin.phone || "");
//         setEmail(admin.email || "");
//         setUsername(admin.username || "");
//         setPassword(admin.password || "");

//         // IMAGE PREVIEW
//         if (admin.imagePath) {
//           setPreviewImage(
//             `http://localhost:8080/${admin.imagePath}`
//           );
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to load admin data ❌");
//     }
//   };

//   // ================= IMAGE CHANGE =================
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // ================= UPDATE ADMIN =================
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       formData.append("fullName", fullName);
//       formData.append("phone", phone);
//       formData.append("email", email);
//       formData.append("username", username);
//       formData.append("password", password);

//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await axios.put(
//         `http://localhost:8080/api/admin/update/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success(response.data || "Profile Updated Successfully ✅");

//       fetchAdminData();

//     } catch (error) {
//       toast.error(error.response?.data || "Update Failed ❌");
//     }
//   };

//   return (
//     <div className="setting-container">
//       <ToastContainer position="top-right" autoClose={2000} />

//       <div className="setting-card">

//         {/* HEADER */}
//         <div className="setting-header">
//           <h2>Admin Settings</h2>
//           <p>Manage your profile information</p>
//         </div>

//         {/* PROFILE IMAGE */}
//         <div className="profile-section">
//           <div className="profile-image-box">

//             {previewImage ? (
//               <img
//                 src={previewImage}
//                 alt="Profile"
//                 className="profile-image"
//               />
//             ) : (
//               <FaUserCircle className="default-profile-icon" />
//             )}

//             <label htmlFor="imageUpload" className="camera-icon">
//               <FaCamera />
//             </label>

//             <input
//               type="file"
//               id="imageUpload"
//               hidden
//               onChange={handleImageChange}
//             />

//           </div>
//         </div>

//         {/* FORM */}
//         <form className="setting-form" onSubmit={handleUpdate}>

//           {/* FULL NAME */}
//           <div className="input-group">
//             <FaUser className="input-icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>

//           {/* PHONE */}
//           <div className="input-group">
//             <FaPhoneAlt className="input-icon" />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           {/* EMAIL */}
//           <div className="input-group">
//             <FaEnvelope className="input-icon" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* USERNAME */}
//           <div className="input-group">
//             <FaIdBadge className="input-icon" />
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* BUTTON */}
//           <button type="submit" className="save-btn">
//             <FaSave />
//             Update Profile
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Setting;

















// // Setting.jsx
// import React, { useState } from "react";
// import "./Setting.css";

// import {
//   FaUserCircle,
//   FaUser,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaLock,
//   FaCamera,
//   FaIdBadge,
//   FaSave,
// } from "react-icons/fa";

// function Setting() {
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   return (
//     <div className="setting-container">
//       <div className="setting-card">

//         {/* Header */}
//         <div className="setting-header">
//           <h2>Admin Settings</h2>
//           <p>Manage your profile information</p>
//         </div>

//         {/* Profile Image */}
//         <div className="profile-section">
//           <div className="profile-image-box">
//             {image ? (
//               <img src={image} alt="Profile" className="profile-image" />
//             ) : (
//               <FaUserCircle className="default-profile-icon" />
//             )}

//             <label htmlFor="imageUpload" className="camera-icon">
//               <FaCamera />
//             </label>

//             <input
//               type="file"
//               id="imageUpload"
//               hidden
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <form className="setting-form">

//           <div className="input-group">
//             <FaUser className="input-icon" />
//             <input type="text" placeholder="Full Name" />
//           </div>

//           <div className="input-group">
//             <FaPhoneAlt className="input-icon" />
//             <input type="text" placeholder="Phone Number" />
//           </div>

//           <div className="input-group">
//             <FaEnvelope className="input-icon" />
//             <input type="email" placeholder="Email Address" />
//           </div>

//           <div className="input-group">
//             <FaIdBadge className="input-icon" />
//             <input type="text" placeholder="Username" />
//           </div>

//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input type="password" placeholder="Password" />
//           </div>

//           <button type="submit" className="save-btn">
//             <FaSave />
//             Save Changes
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Setting;
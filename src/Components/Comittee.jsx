import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comittee.css";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaLinkedin,
  FaTwitter,
  FaTimes,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comittee() {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMember]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comite/all`);
      setCommitteeMembers(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch committee members");
    }
  };

  const getImage = (img) => {
    return img
      ? `${BASE_URL}/images/${img}`
      : "https://via.placeholder.com/400x300?text=No+Image";
  };

  const deleteMember = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this profile?</p>

        <div className="toast-btns">
          <button
            className="yes-btn"
            onClick={async () => {
              try {
                await axios.delete(`${BASE_URL}/comite/delete/${id}`);

                setCommitteeMembers((prev) =>
                  prev.filter((item) => item.comiteId !== id)
                );

                toast.success("Profile deleted successfully");
              } catch (error) {
                toast.error("Delete failed");
              }
            }}
          >
            Yes
          </button>

          <button className="no-btn">No</button>
        </div>
      </div>,
      {
        autoClose: 5000,
      }
    );
  };

  return (
    <div className="committee-main-page">

      <ToastContainer position="top-right" />

      <div className="committee-header-section">
        <h2>Our Committee</h2>
        <p>Meet our amazing team members</p>
      </div>

      <div className="committee-grid-layout">

        {committeeMembers.map((member, index) => (
          <motion.div
            key={member.comiteId}
            className="committee-single-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >

            <div
              className="committee-card-image-wrapper"
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={getImage(member.image)}
                alt="member"
                className="committee-card-image"
              />

              <div className="committee-image-overlay">
                <div className="committee-social-icons">
                  <FaLinkedin />
                  <FaTwitter />
                </div>
              </div>
            </div>

            <div className="committee-card-content">
              <h3>{member.comiteMemberName}</h3>

              <p className="committee-role-text">
                {member.title}
              </p>

              <p className="committee-section-text">
                {member.section?.sectionName}
              </p>

              <div className="committee-action-buttons">

                <button className="edit-btn">
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteMember(member.comiteId)}
                >
                  <FaTrash />
                </button>

              </div>
            </div>

          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="committee-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >

            <motion.div
              className="committee-modal-container"
              initial={{ scale: 0.7, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >

              <FaTimes
                className="committee-close-icon"
                onClick={() => setSelectedMember(null)}
              />

              <img
                src={getImage(selectedMember.image)}
                alt="member"
                className="committee-modal-image"
              />

              <h2>{selectedMember.comiteMemberName}</h2>

              <p className="committee-role-text">
                {selectedMember.title}
              </p>

              <p className="committee-section-text">
                {selectedMember.section?.sectionName}
              </p>

              <p className="committee-description">
                {selectedMember.description}
              </p>

              <div className="committee-modal-social-icons">
                <FaLinkedin />
                <FaTwitter />
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Comittee;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Comittee.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaLinkedin, FaTwitter, FaTimes } from "react-icons/fa";

// function Comittee() {
//   const [members, setMembers] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const BASE_URL = "http://localhost:8080/api";

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/comite/all`);
//       setMembers(res.data || []);
//     } catch (error) {
//       console.error("Error fetching members", error);
//     }
//   };

//   const getImage = (img) => {
//     return img
//       ? `${BASE_URL}/images/${img}`
//       : "https://via.placeholder.com/400x300?text=No+Image";
//   };

//   return (
//     <div className="committee-page">

//       <div className="header-section">
//         <h2>Our Committee</h2>
//         <p>Meet our amazing team</p>
//       </div>

//       <div className="committee-grid">
//         {members.map((member, index) => (
//           <motion.div
//             key={member.comiteId}
//             className="committee-card"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.08 }}
//             whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
//             onClick={() => setSelected({ ...member })}  // 🔥 FIX
//           >

//             {/* IMAGE */}
//             <div className="card-image">
//               <img src={getImage(member.image)} alt="member" />

//               <div className="overlay">
//                 <div className="social-icons">
//                   <FaLinkedin />
//                   <FaTwitter />
//                 </div>
//               </div>
//             </div>

//             {/* BODY */}
//             <div className="card-body">
//               <h3>{member.comiteMemberName || "N/A"}</h3>
//               <p className="role">{member.title || "N/A"}</p>
//               <p className="section">
//                 {member.section?.sectionName || "No Section"}
//               </p>
//             </div>

//           </motion.div>
//         ))}
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {selected && (
//           <div
//             className="modal-overlay"
//             onClick={() => setSelected(null)}
//           >
//             <motion.div
//               className="modal"
//               initial={{ scale: 0.7, opacity: 0, y: 50 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.7, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <FaTimes
//                 className="close-btn"
//                 onClick={() => setSelected(null)}
//               />

//               <img src={getImage(selected.image)} alt="member" />

//               <h2>{selected.comiteMemberName || "N/A"}</h2>

//               <p className="role">{selected.title || "N/A"}</p>

//               <p className="section">
//                 {selected.section?.sectionName || "No Section"}
//               </p>

//               <p className="desc">
//                 {selected.description || "No description available"}
//               </p>

//               <div className="modal-social">
//                 <FaLinkedin />
//                 <FaTwitter />
//               </div>

//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

// export default Comittee;
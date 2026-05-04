import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comittee.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaTwitter, FaTimes } from "react-icons/fa";

function Comittee() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comite/all`);
      setMembers(res.data || []);
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  const getImage = (img) => {
    return img
      ? `${BASE_URL}/images/${img}`
      : "https://via.placeholder.com/400x300?text=No+Image";
  };

  return (
    <div className="committee-page">

      <div className="header-section">
        <h2>Our Committee</h2>
        <p>Meet our amazing team</p>
      </div>

      <div className="committee-grid">
        {members.map((member, index) => (
          <motion.div
            key={member.comiteId}
            className="committee-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
            onClick={() => setSelected({ ...member })}  // 🔥 FIX
          >

            {/* IMAGE */}
            <div className="card-image">
              <img src={getImage(member.image)} alt="member" />

              <div className="overlay">
                <div className="social-icons">
                  <FaLinkedin />
                  <FaTwitter />
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="card-body">
              <h3>{member.comiteMemberName || "N/A"}</h3>
              <p className="role">{member.title || "N/A"}</p>
              <p className="section">
                {member.section?.sectionName || "No Section"}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <div
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaTimes
                className="close-btn"
                onClick={() => setSelected(null)}
              />

              <img src={getImage(selected.image)} alt="member" />

              <h2>{selected.comiteMemberName || "N/A"}</h2>

              <p className="role">{selected.title || "N/A"}</p>

              <p className="section">
                {selected.section?.sectionName || "No Section"}
              </p>

              <p className="desc">
                {selected.description || "No description available"}
              </p>

              <div className="modal-social">
                <FaLinkedin />
                <FaTwitter />
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Comittee;
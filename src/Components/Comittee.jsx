import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comittee.css";

function Comittee() {
  const [members, setMembers] = useState([]);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comite/all`);
      setMembers(res.data || []);
    } catch (error) {
      console.error("Error fetching members");
    }
  };

  return (
    <div className="committee-page">

      <div className="header-section">
        <h2>Our Committee</h2>
        <p>Meet our amazing team members</p>
      </div>

      <div className="committee-grid">

        {members.length > 0 ? (
          members.map((member, index) => (
            <div
              key={member.comiteId}
              className={`committee-card 
                ${index % 6 === 0 ? "featured" : ""}
              `}
            >

              {/* IMAGE */}
              <div className="card-image">
                {member.image ? (
                  <img
                    src={`${BASE_URL}/images/${member.image}`}
                    alt="member"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}

                <div className="overlay">
                  <h4>{member.comiteMemberName}</h4>
                  <span>{member.title}</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="card-body">

                <h3>{member.comiteMemberName}</h3>

                <p className="role">{member.title}</p>

                <p className="section">
                  {member.section?.sectionName}
                </p>

                <p className="desc">
                  {member.description}
                </p>

              </div>

            </div>
          ))
        ) : (
          <p className="no-data">No Members Found</p>
        )}

      </div>
    </div>
  );
}

export default Comittee;
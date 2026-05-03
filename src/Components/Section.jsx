import React, { useState, useEffect } from "react";
import "./Section.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function Section() {
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionData, setSectionData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSectionId, setUpdateSectionId] = useState(null);
  const [updateSectionName, setUpdateSectionName] = useState("");

  const API_URL = "http://localhost:8080/api/sections";

  // ================= FETCH =================
  const loadSections = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setSectionData(response.data);
    } catch (error) {
      toast.error("Failed to load sections");
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  // ================= ADD =================
  const handleAddSection = async (e) => {
    e.preventDefault();

    if (!sectionTitle.trim()) {
      toast.error("Section name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("sectionName", sectionTitle);

      await axios.post(`${API_URL}/add`, formData);

      toast.success("Section Added Successfully ✅");
      setSectionTitle("");
      loadSections();
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  // ================= OPEN UPDATE MODAL =================
  const openUpdateModal = (section) => {
    setUpdateSectionId(section.sectionId);
    setUpdateSectionName(section.sectionName);
    setIsModalOpen(true);
  };

  // ================= UPDATE =================
  const handleUpdateSection = async () => {
    if (!updateSectionName.trim()) {
      toast.error("Section name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("sectionName", updateSectionName);

      await axios.put(
        `${API_URL}/update/${updateSectionId}`,
        formData
      );

      toast.success("Section Updated Successfully ✅");
      setIsModalOpen(false);
      loadSections();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // ================= DELETE =================
  const handleDeleteSection = (section) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>
            Delete <b>{section.sectionName}</b> ?
          </p>

          <div className="section-toast-actions">
            <button
              className="section-confirm-btn"
              onClick={async () => {
                try {
                  await axios.delete(
                    `${API_URL}/delete/${section.sectionId}`
                  );

                  toast.success("Deleted Successfully ✅");
                  loadSections();
                  closeToast();
                } catch (error) {
                  toast.error("Delete failed");
                }
              }}
            >
              Yes
            </button>

            <button
              className="section-cancel-btn"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
      }
    );
  };

  return (
    <div className="section-page">
      <div className="section-layout">

        {/* ================= ADD SECTION ================= */}
        <div className="section-card">
          <h2 className="section-heading">
            Add Section
          </h2>

          <form
            className="section-form"
            onSubmit={handleAddSection}
          >
            <input
              type="text"
              placeholder="Enter section name"
              value={sectionTitle}
              onChange={(e) =>
                setSectionTitle(e.target.value)
              }
              className="section-input"
            />

            <button
              type="submit"
              className="section-submit-btn"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ================= TABLE ================= */}
        <div className="section-card">
          <h2 className="section-heading">
            Section List
          </h2>

          <div className="section-table-wrapper">
            <table className="section-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Section Name</th>
                  <th>Created Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {sectionData.length > 0 ? (
                  sectionData.map((section, index) => (
                    <tr key={section.sectionId}>
                      <td>{index + 1}</td>

                      <td>{section.sectionName}</td>

                      <td>
                        {section.createdOn
                          ? new Date(
                              section.createdOn
                            ).toLocaleString()
                          : "-"}
                      </td>

                      <td>
                        <button
                          className="section-edit-btn"
                          onClick={() =>
                            openUpdateModal(section)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="section-delete-btn"
                          onClick={() =>
                            handleDeleteSection(section)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="section-empty-row"
                    >
                      No Sections Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {isModalOpen && (
        <div className="section-modal-overlay">
          <div className="section-modal-box">

            <div className="section-modal-header">
              <h3>Update Section</h3>

              <FaTimes
                className="section-close-icon"
                onClick={() =>
                  setIsModalOpen(false)
                }
              />
            </div>

            <input
              type="text"
              value={updateSectionName}
              onChange={(e) =>
                setUpdateSectionName(
                  e.target.value
                )
              }
              className="section-modal-input"
            />

            <button
              className="section-update-btn"
              onClick={handleUpdateSection}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Section;




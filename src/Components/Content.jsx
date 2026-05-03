import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Content.css";

import {
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Content() {
  const [memberForm, setMemberForm] = useState({
    sectionId: "",
    comiteMemberName: "",
    title: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [memberList, setMemberList] = useState(
    []
  );

  const [sectionList, setSectionList] =
    useState([]);

  const [updateId, setUpdateId] = useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const BASE_URL = "http://localhost:8080/api";

  // ================= FETCH DATA =================

  useEffect(() => {
    fetchMembers();
    fetchSections();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comite/all`
      );

      setMemberList(response.data || []);
    } catch (error) {
      toast.error("Failed to load members");
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/sections/all`
      );

      setSectionList(response.data || []);
    } catch (error) {
      toast.error("Failed to load sections");
    }
  };

  // ================= INPUT CHANGE =================

  const handleInputChange = (e) => {
    setMemberForm({
      ...memberForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // ================= RESET FORM =================

  const resetForm = () => {
    setMemberForm({
      sectionId: "",
      comiteMemberName: "",
      title: "",
      description: "",
    });

    setSelectedImage(null);
    setUpdateId(null);
  };

  // ================= ADD / UPDATE =================

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (
      !memberForm.sectionId ||
      !memberForm.comiteMemberName ||
      !memberForm.title ||
      !memberForm.description
    ) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();

    formData.append(
      "sectionId",
      memberForm.sectionId
    );

    formData.append(
      "comiteMemberName",
      memberForm.comiteMemberName
    );

    formData.append(
      "title",
      memberForm.title
    );

    formData.append(
      "description",
      memberForm.description
    );

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      if (updateId) {
        formData.append("comiteId", updateId);

        await axios.put(
          `${BASE_URL}/comite/update`,
          formData
        );

        toast.success(
          "Member Updated Successfully ✅"
        );
      } else {
        await axios.post(
          `${BASE_URL}/comite/add`,
          formData
        );

        toast.success(
          "Member Added Successfully ✅"
        );
      }

      fetchMembers();

      resetForm();

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Operation Failed ❌");
    }
  };

  // ================= DELETE =================

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BASE_URL}/comite/delete?id=${id}`
      );

      toast.success(
        "Deleted Successfully ✅"
      );

      fetchMembers();
    } catch (error) {
      toast.error("Delete Failed ❌");
    }
  };

  // ================= EDIT =================

  const handleEditMember = (member) => {
    setUpdateId(member.comiteId);

    setMemberForm({
      sectionId:
        member.section?.sectionId || "",
      comiteMemberName:
        member.comiteMemberName || "",
      title: member.title || "",
      description:
        member.description || "",
    });

    setIsModalOpen(true);
  };

  return (
    <div className="content-page">

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* ================= HEADER ================= */}

      <div className="content-header">

        <h2>Comite Members</h2>

        <button
          className="content-add-btn"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          + Add Member
        </button>

      </div>

      {/* ================= TABLE ================= */}

      <div className="content-card">

        <table className="content-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Section</th>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {memberList.length > 0 ? (
              memberList.map((member) => (
                <tr key={member.comiteId}>

                  <td>{member.comiteId}</td>

                  <td>
                    {member.section?.sectionName}
                  </td>

                  <td>
                    {member.comiteMemberName}
                  </td>

                  <td>{member.title}</td>

                  <td>
                    {member.description}
                  </td>

                  <td>
                    {member.image ? (
                      <img
                        src={`http://localhost:8080/api/images/${member.image}`}
                        alt="member"
                        className="content-table-image"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>

                    <div className="content-action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditMember(member)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteMember(
                            member.comiteId
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="content-no-data"
                >
                  No Members Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* ================= MODAL ================= */}

      {isModalOpen && (
        <div className="modal">

          <div className="modal-content">

            <div className="modal-header">

              <h3>
                {updateId
                  ? "Update Member"
                  : "Add Member"}
              </h3>

              <FaTimes
                className="close-icon"
                onClick={() =>
                  setIsModalOpen(false)
                }
              />

            </div>

            <form onSubmit={handleSubmitForm}>

              <select
                name="sectionId"
                value={memberForm.sectionId}
                onChange={handleInputChange}
              >
                <option value="">
                  Select Section
                </option>

                {sectionList.map((section) => (
                  <option
                    key={section.sectionId}
                    value={section.sectionId}
                  >
                    {section.sectionName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="comiteMemberName"
                placeholder="Member Name"
                value={
                  memberForm.comiteMemberName
                }
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={memberForm.title}
                onChange={handleInputChange}
              />

              <input
                type="file"
                onChange={handleImageChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={
                  memberForm.description
                }
                onChange={handleInputChange}
              />

              <button type="submit">
                {updateId
                  ? "Update Member"
                  : "Add Member"}
              </button>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}

export default Content;


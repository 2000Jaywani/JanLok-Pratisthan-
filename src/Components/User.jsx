import React, { useState, useMemo, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { toast } from "react-toastify";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaFilePdf,
  FaFileCsv,
  FaFileExcel,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function User() {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [userList, setUserList] = useState([]);

  const [viewUserData, setViewUserData] = useState(null);
  const [editUserData, setEditUserData] = useState(null);

  const rowsPerPage = 5;

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/getAllUsers"
      );

      setUserList(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= SEARCH =================
  const filteredUsers = useMemo(() => {
    return userList.filter((user) =>
      Object.values(user || {})
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [userList, searchText]);

  // ================= PDF EXPORT =================
  const handleExportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Name", "Email", "Mobile", "City", "Gender"]],
      body: filteredUsers.map((user) => [
        user.fullName || "",
        user.email || "",
        user.mobileNumber || "",
        user.city || "",
        user.gender || "",
      ]),
    });

    doc.save("users.pdf");
  };

  // ================= CSV EXPORT =================
  const handleExportCSV = () => {
    const csvData = [
      ["Name", "Email", "Mobile", "City", "Gender"],
      ...filteredUsers.map((user) => [
        user.fullName || "",
        user.email || "",
        user.mobileNumber || "",
        user.city || "",
        user.gender || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    saveAs(new Blob([csvData]), "users.csv");
  };

  // ================= EXCEL EXPORT =================
  const handleExportExcel = () => {
    const cleanData = filteredUsers.map((user) => ({
      Name: user.fullName,
      Email: user.email,
      Mobile: user.mobileNumber,
      City: user.city,
      Gender: user.gender,
    }));

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "users.xlsx");
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil(
    filteredUsers.length / rowsPerPage
  );

  const paginatedUsers = filteredUsers.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage
  );

  // ================= DELETE =================
  const confirmDeleteUser = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this user?</p>

          <div className="user-toast-buttons">
            <button
              className="user-confirm-btn"
              onClick={async () => {
                await deleteUser(id);
                closeToast();
              }}
            >
              Yes
            </button>

            <button
              className="user-cancel-btn"
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/users/delete/${id}`
      );

      toast.success("User Deleted Successfully ✅");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed ❌");
    }
  };

  // ================= UPDATE =================
  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "fullName",
        editUserData.fullName || ""
      );

      formData.append(
        "email",
        editUserData.email || ""
      );

      formData.append(
        "mobileNumber",
        editUserData.mobileNumber || ""
      );

      formData.append(
        "dateOfBirth",
        editUserData.dateOfBirth || ""
      );

      formData.append(
        "gender",
        editUserData.gender || ""
      );

      formData.append(
        "city",
        editUserData.city || ""
      );

      formData.append(
        "address",
        editUserData.address || ""
      );

      if (editUserData.imageFile) {
        formData.append(
          "image",
          editUserData.imageFile
        );
      }

      await axios.put(
        `http://localhost:8080/api/users/update/${editUserData.userId}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success("User Updated Successfully ✅");

      setEditUserData(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Update Failed ❌");
    }
  };

  return (
    <div className="user-page-wrapper">

      <div className="user-header-section">
        <h2 className="user-page-title">
          👥 User Management
        </h2>

        <div className="user-toolbar">

          {/* SEARCH */}
          <div className="user-search-box">
            <FaSearch className="user-search-icon" />

            <input
              type="text"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPageNumber(1);
              }}
            />
          </div>

          {/* EXPORT BUTTONS */}
          <div className="user-export-group">

            <button
              className="user-export-btn pdf-btn"
              onClick={handleExportPDF}
            >
              <FaFilePdf />
              PDF
            </button>

            <button
              className="user-export-btn csv-btn"
              onClick={handleExportCSV}
            >
              <FaFileCsv />
              CSV
            </button>

            <button
              className="user-export-btn excel-btn"
              onClick={handleExportExcel}
            >
              <FaFileExcel />
              Excel
            </button>

          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="user-table-container">
        <table className="user-data-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr key={user.userId}>

                  <td>
                    {(pageNumber - 1) *
                      rowsPerPage +
                      index +
                      1}
                  </td>

                  <td>{user.fullName}</td>

                  <td>
                    {user.image ? (
                      <img
                        src={`http://localhost:8080/api/images/${user.image}`}
                        alt=""
                        className="user-profile-image"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{user.email}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.city}</td>
                  <td>{user.address}</td>
                  <td>{user.gender}</td>

                  <td>
                    <div className="user-action-buttons">

                      <button
                        className="user-action-btn view-btn"
                        onClick={() =>
                          setViewUserData(user)
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="user-action-btn edit-btn"
                        onClick={() =>
                          setEditUserData({
                            ...user,
                          })
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="user-action-btn delete-btn"
                        onClick={() =>
                          confirmDeleteUser(
                            user.userId
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
                  colSpan="10"
                  className="user-no-data"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="user-pagination-wrapper">

        <button
          disabled={pageNumber === 1}
          onClick={() =>
            setPageNumber((prev) => prev - 1)
          }
        >
          ◀
        </button>

        {[...Array(totalPages || 1)].map(
          (_, index) => (
            <button
              key={index}
              className={
                pageNumber === index + 1
                  ? "active-page"
                  : ""
              }
              onClick={() =>
                setPageNumber(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={
            pageNumber === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPageNumber((prev) => prev + 1)
          }
        >
          ▶
        </button>
      </div>

      {/* VIEW MODAL */}
      {viewUserData && (
        <div
          className="user-modal-overlay"
          onClick={() =>
            setViewUserData(null)
          }
        >
          <div
            className="user-modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="user-modal-close"
              onClick={() =>
                setViewUserData(null)
              }
            >
              <FaTimes />
            </button>

            <h3 className="user-modal-title">
              User Details
            </h3>

            {viewUserData.image && (
              <img
                src={`http://localhost:8080/api/images/${viewUserData.image}`}
                alt=""
                className="user-modal-image"
              />
            )}

            <div className="user-details-grid">
              <p>
                <b>Name:</b>{" "}
                {viewUserData.fullName}
              </p>

              <p>
                <b>Email:</b>{" "}
                {viewUserData.email}
              </p>

              <p>
                <b>DOB:</b>{" "}
                {viewUserData.dateOfBirth}
              </p>

              <p>
                <b>Mobile:</b>{" "}
                {viewUserData.mobileNumber}
              </p>

              <p>
                <b>City:</b>{" "}
                {viewUserData.city}
              </p>

              <p>
                <b>Address:</b>{" "}
                {viewUserData.address}
              </p>

              <p>
                <b>Gender:</b>{" "}
                {viewUserData.gender}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {editUserData && (
        <div
          className="user-modal-overlay"
          onClick={() =>
            setEditUserData(null)
          }
        >
          <div
            className="user-modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="user-modal-close"
              onClick={() =>
                setEditUserData(null)
              }
            >
              <FaTimes />
            </button>

            <h3 className="user-modal-title">
              Update User
            </h3>

            {[
              "fullName",
              "email",
              "mobileNumber",
              "dateOfBirth",
              "city",
              "address",
              "gender",
            ].map((field) => (
              <input
                key={field}
                type="text"
                className="user-modal-input"
                placeholder={field}
                value={
                  editUserData[field] || ""
                }
                onChange={(e) =>
                  setEditUserData({
                    ...editUserData,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <input
              type="file"
              className="user-modal-input"
              onChange={(e) =>
                setEditUserData({
                  ...editUserData,
                  imageFile:
                    e.target.files[0],
                })
              }
            />

            <button
              className="user-save-btn"
              onClick={handleUpdateUser}
            >
              Update User
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default User;

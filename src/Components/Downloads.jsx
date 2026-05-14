import React, { useState } from "react";
import "./Downloads.css";

function Downloads() {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [formData, setFormData] = useState({
    docName: "",
    docDesc: "",
    file: null,
  });

  const [documents, setDocuments] = useState([
    {
      id: 1,
      docName: "Project Report",
      docDesc: "Monthly project status report",
      fileName: "project-report.pdf",
      createdOn: "14-05-2026",
    },
    {
      id: 2,
      docName: "HR Policy",
      docDesc: "Company HR document",
      fileName: "hr-policy.docx",
      createdOn: "13-05-2026",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!formData.docName || !formData.docDesc || !formData.file) {
      alert("Please fill all fields");
      return;
    }

    const newDoc = {
      id: documents.length + 1,
      docName: formData.docName,
      docDesc: formData.docDesc,
      fileName: formData.file.name,
      createdOn: new Date().toLocaleDateString(),
    };

    setDocuments([...documents, newDoc]);

    setFormData({
      docName: "",
      docDesc: "",
      file: null,
    });

    document.getElementById("fileUploadControl").value = "";
  };

  const filteredDocs = documents.filter(
    (item) =>
      item.docName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.docDesc.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="docpage-wrapper">
      <div className="docpage-header-box">
        <h1 className="docpage-main-title">Document Management</h1>
        <p className="docpage-sub-title">
          Upload, search and manage all important files in one place
        </p>
      </div>

      <div className="docpage-layout-grid">
        {/* Form */}
        <div className="docpage-form-card">
          <h2 className="docpage-section-title">Upload New Document</h2>

          <form className="docpage-form-box" onSubmit={handleSubmitForm}>
            <div className="docpage-field-wrap">
              <label>Document Name</label>
              <input
                type="text"
                name="docName"
                value={formData.docName}
                onChange={handleInputChange}
                placeholder="Enter document name"
              />
            </div>

            <div className="docpage-field-wrap">
              <label>Description</label>
              <textarea
                name="docDesc"
                value={formData.docDesc}
                onChange={handleInputChange}
                placeholder="Enter document description"
              />
            </div>

            <div className="docpage-field-wrap">
              <label>Select File</label>
              <input
                type="file"
                id="fileUploadControl"
                name="file"
                onChange={handleInputChange}
              />
            </div>

            <button className="docpage-submit-btn" type="submit">
              Upload Document
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="docpage-table-card">
          <div className="docpage-table-topbar">
            <input
              type="text"
              className="docpage-search-box"
              placeholder="Search documents..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              className="docpage-page-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={300}>300</option>
              <option value={500}>500</option>
            </select>
          </div>

          <div className="docpage-table-scroll">
            <table className="docpage-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Document Name</th>
                  <th>Description</th>
                  <th>Download File</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.slice(0, pageSize).map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>{doc.docName}</td>
                    <td>{doc.docDesc}</td>
                    <td>
                      <button className="docpage-download-btn">
                        Download
                      </button>
                    </td>
                    <td>{doc.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
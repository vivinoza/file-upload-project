import React, { useState } from "react";
import { uploadFile } from "../api";

const FileUpload = ({ token }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await uploadFile(formData, token);
      setUploadMessage(
        `File uploaded successfully! Your unique code is: ${data.uniqueCode}`
      );
    } catch (error) {
      alert("File upload failed");
    }
  };

  return (
    <div className="file-upload-container">
      <h3>Upload a File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadMessage && <p className="success-message">{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;

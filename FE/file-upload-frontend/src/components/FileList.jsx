import React, { useEffect, useState } from "react";
import { getFileList, deleteFile, downloadFile } from "../api";

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const data = await getFileList(token);
      setFiles(data || []);
    } catch (error) {
      alert("Failed to fetch files");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId, token);
      fetchFiles();
    } catch (error) {
      alert("Failed to delete file");
    }
  };

  const handleDownload = async (fileId) => {
    const code = prompt("Enter the unique code for this file:");

    if (!code) {
      alert("Download code is required.");
      return;
    }

    try {
      const response = await downloadFile(fileId, code, token);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        response.headers["content-disposition"]?.split("filename=")[1] ||
          "downloaded_file"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Invalid code or download failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [token]);

  if (loading) return <p>Loading files...</p>;

  return (
    <div className="file-list-container">
      <h3>Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              <span>{file.filename}</span>
              <button onClick={() => handleDownload(file._id)}>Download</button>
              <button onClick={() => handleDelete(file._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;

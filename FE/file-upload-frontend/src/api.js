import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const uploadFile = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("File upload failed");
  }
};

export const getFileList = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch file list");
  }
};

export const deleteFile = async (fileId, token) => {
  try {
    await axios.delete(`${API_URL}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete file");
  }
};

export const downloadFile = async (fileId, code, token) => {
  return await axios.post(
    `http://localhost:5000/api/files/download/${fileId}`,
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );
};

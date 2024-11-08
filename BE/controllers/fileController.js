import fs from "fs";
import path from "path";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  const { originalname: filename, path: filePath } = req.file;
  const uniqueCode = Math.floor(100000 + Math.random() * 900000).toString();

  const file = new File({
    userId: req.user.userId,
    filename,
    uniqueCode,
    filePath,
  });

  try {
    await file.save();
    res.json({ message: "File uploaded successfully", uniqueCode });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.userId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve files" });
  }
};

export const downloadFile = async (req, res) => {
  const { fileId } = req.params;
  const { code } = req.body;

  try {
    const file = await File.findById(fileId);
    if (!file || file.uniqueCode !== code) {
      return res.status(403).json({ error: "Invalid code or file not found" });
    }
    res.download(file.filePath, file.filename);
  } catch (error) {
    res.status(500).json({ error: "File download failed" });
  }
};

export const deleteFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.resolve(file.filePath);
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to delete file from file system" });
      }

      try {
        await File.findByIdAndDelete(fileId);
        res.json({ message: "File deleted successfully" });
      } catch (dbError) {
        res.status(500).json({ error: "Failed to delete file from database" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

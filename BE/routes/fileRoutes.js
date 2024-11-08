import express from "express";
import multer from "multer";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authenticateUser, upload.single("file"), uploadFile);
router.get("/", authenticateUser, getFiles);
router.post("/download/:fileId", authenticateUser, downloadFile);
router.delete("/:fileId", authenticateUser, deleteFile);

export default router;

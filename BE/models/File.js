import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: { type: String, required: true },
  uniqueCode: { type: String, required: true },
  filePath: { type: String, required: true },
});

export default mongoose.model("File", fileSchema);

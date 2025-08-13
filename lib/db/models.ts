// models/User.js
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  _id: { type: String }, // keep short IDs if you want to match old 'u123' format
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });



export default models.User || model("User", UserSchema);

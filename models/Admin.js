import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: String,
  password: { type: String, unique: true },
}, { timestamps: true });



export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
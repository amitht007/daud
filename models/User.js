import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: { type: String, unique: true },
  email: { type: String, unique: true },
  empcode: { type: String, unique: true },
}, { timestamps: true });



export default mongoose.models.User || mongoose.model('User', UserSchema);
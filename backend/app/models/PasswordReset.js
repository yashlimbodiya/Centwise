import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PasswordResetSchema = new mongoose.Schema({
  userId: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
  
});

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordReset;
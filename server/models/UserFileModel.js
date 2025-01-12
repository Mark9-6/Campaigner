import mongoose from "mongoose";

const userFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: String,
  data: [{}], // CSV content stored as JSON
});

const UserFile = mongoose.models.UserFile|| mongoose.model('UserFile', userFileSchema);
 export default UserFile  

import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, default: '+923054170452' },
    panCardNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },

},{timestamps:true})


const userModel = mongoose.models.user || mongoose.model("user" , userSchema);

export default userModel;
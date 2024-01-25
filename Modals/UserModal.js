import mongoose from "mongoose";



const CreateStand = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

},{timestamps:true})

const StandModal = mongoose.model('signup',CreateStand)
export default StandModal;
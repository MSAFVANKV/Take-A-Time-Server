import mongoose from "mongoose";



const CreateStand = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    personalDetails: { type: Object },
    RouteDetails: { type: Object },
    paymentDetails: { type: Object },


},{timestamps:true})

const StandModal = mongoose.model('signup',CreateStand)
export default StandModal;
import mongoose from "mongoose";


const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordOTP: {
        type: String,
        default: ''
    }
}, {timestamps: true});

const Agent = mongoose.model('Agent', agentSchema);

// Hash password before saving



export default Agent;
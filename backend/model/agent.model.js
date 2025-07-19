import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})




export default Agent;
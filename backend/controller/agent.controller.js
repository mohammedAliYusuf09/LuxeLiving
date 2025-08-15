import Agent from "../model/agent.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { emailFormat } from "../config/constents.js";

// controllers 
// signUpAgent
// logInAgent
// logOutAgent
// forgetPassword
// resetPassword
// sendOtpviaEmail

const signUpAgent = async (req, res) => {
    // get all filds
    const {name, email, password} = req.body;
    // validate all filds
    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({success: false, message: "Please provide a valid email"});
    }

    // validate password
    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({success: false, message: "Please provide a strong password"});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // check if agent already exists
    const existingAgent = await Agent.findOne({ email});

    if(existingAgent) {
        return res.status(400).json({success: false,message: "Agent already exists"});
    }
    // create agent
    const agent = await Agent.create({
        name,
        email,
        password: hashedPassword
    });
    // return response
    return res.status(201).json({success: true, message: "Agent created successfully", agent});
}

const logInAgent = async (req, res) => {
    const { password } = req.body;

    // validate all fields
    if (!password) {
        return res.status(400).json({success: false, message: "Please provide password"});
    }

    // // validate email
    // if (!validator.isEmail(email)) {
    //     return res.status(400).json({success: false, message: "Please provide a valid email"});
    // }

    // check if agent exists
    const agent = await Agent.find();


    if (!agent) {
        return res.status(400).json({success: false, message: "Agent does not exist"});
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, agent[0].password);

    if (!isPasswordValid) {
        return res.status(400).json({success: false, message: "Invalid password"});
    }

    // genatete access token
    const accessToken = jwt.sign(
        {
            _id: agent[0]._id,
            email: agent[0].email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    if(!accessToken) {
        return res.status(500).json({success: false, message: "Failed to generate access token"});
    }

    // cokies options
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }

    // return response
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json({success: true, message: "Login successful", agent, accessToken});
}


const logoutAgent = async(req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({success: true, message: "Logout successful"});
}


// forget password functionality

const sendOtpviaEmail = async (req, res) => {
    // get email fom request body
    const {email} = req.agent;


    // chacke if email exists
    const agent = await Agent.findOne({ email});

    if(!agent){
        return res.status(400).json({success: false, message: "Agent does not exist"});
    }

    // genarate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save otp to agent
    agent.resetPasswordOTP = otp;
    await agent.save();


    const maileOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Forget Password OTP",
    html: emailFormat.replace('123456', otp)
    }

    await transporter.sendMail(maileOptions);

    // return response
    return res.status(200).json({success: true, message: "OTP sent to your email", otp});
}

// validate otp 

const validateOtp = async (req, res) => {
    const {otp} = req.body;
    const {email}  = req.agent;

    if(!otp) {
        return res.status(400).json({success: false, message: "Please provide OTP"})
    }

    if(!email) {
        return res.status(400).json({success: false, message: "Please provide Email"})
    }

    // find agent by email 
    const agent = await Agent.findOne({ email});
    if(!agent) {
        return res.status(400).json({success: false, message: "Agent does not exist"});
    }

    // check if agent updatedAt is within 10 minutes
    const tenMinutes = 10 * 60 * 1000;
    const currentTime = new Date().getTime();
    const updatedTime = new Date(agent.updatedAt).getTime();
    if (currentTime - updatedTime > tenMinutes) {
        return res.status(400).json({success: false, message: "OTP has expired, please request a new OTP"});
    }

    // check if otp is valid
    if(agent.resetPasswordOTP !== otp) {
        return res.status(400).json({success: false, message: "Invalid OTP"});
    }

    // OTP is valid
    return res.status(200).json({success: true, message: "OTP is valid"});
}


// save new password
const saveNewPassword = async (req, res) => {
    const {email} = req.agent;
    const {newPassword} = req.body;

    // validate new password
    if(!newPassword) {
        return res.status(400).json({success: false, message: "Please provide a new password"});
    }

    if(!validator.isStrongPassword(newPassword)) {
         return res.status(400).json({success: false, message: "Please provide a String password"});
    }

    // find agent by email
    const agent = await Agent.findOne({ email});
    if(!agent) {
         return res.status(400).json({success: false, message: "Agent does not exist"});
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword,10);

    // update agent password
    agent.password = hashedPassword;
    agent.resetPasswordOTP = '';
    await agent.save();

    // return response
    return res.status(200).json({success: true, message: "Password updated successfully"});

}

// reset password functionality

const resetPassword = async (req, res) => {
    
    const {oldPassword, newPassword} = req.body;
    const {email} = req.agent;

    // chack fild are not empty
    if(!oldPassword || !newPassword) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    // validate new password
    if(!validator.isStrongPassword(newPassword)){
        return res.status(402).json({success: false, message: "Please provide a strong password"});
    }

    // find agent by email
    const agent = await Agent.findOne({ email});
    if(!agent) {
        return res.status(403).json({success: false, message: "Agnet does not exist"});
    }

    // compare old password
    const isPasswordValid = await bcrypt.compare(oldPassword, agent.password);

    if(!isPasswordValid) {
        return res.status(401).json({success: false, message: "Password is incorrect"});
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    agent.password = hashedPassword;
    await agent.save();

    // return response
    return res.status(200).json({success: true, message: "Password updated successfully"});                 
}

const chackIsLogdin = async (req, res) => {
    const { email } = req.agent;
    if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const user = await Agent.findOne({email}).select( "-password -resetPasswordOTP")

        if(!user){
            return res.status(400).json({success: false, message: "user could not found on database"})
        }

        return res.status(200).json({success: true, message: "user is logdIn", user})
    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }
    
}





export{
    signUpAgent,
    logInAgent,
    logoutAgent,
    sendOtpviaEmail,
    validateOtp,
    saveNewPassword,
    resetPassword,
    chackIsLogdin
}
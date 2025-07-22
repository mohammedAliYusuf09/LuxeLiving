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
    // get all fields
    const {email, password} = req.body;

    // validate all fields
    if (!email || !password) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({success: false, message: "Please provide a valid email"});
    }

    // check if agent exists
    const agent = await Agent.findOne({ email });


    if (!agent) {
        return res.status(400).json({success: false, message: "Agent does not exist"});
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, agent.password);

    if (!isPasswordValid) {
        return res.status(400).json({success: false, message: "Invalid password"});
    }

    // genatete access token
    const accessToken = jwt.sign(
        {
            _id: agent._id,
            email: agent.email,
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
        secure: true
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

const forgetPassword = async (req, res) => {
    // get email fom request body
    const {email} = req.body;

    // vlaidate email
    if(!email){
         return res.status(400).json({success: false, message: "Please provide email fields"});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({success: false, message: "Please provide a valid email"});
    }

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
    const {email , otp} = req.body;

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




export{
    signUpAgent,
    logInAgent,
    logoutAgent,
    forgetPassword,
    validateOtp
}
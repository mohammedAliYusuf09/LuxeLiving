import Agent from "../model/agent.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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


export{
    signUpAgent,
    logInAgent
}
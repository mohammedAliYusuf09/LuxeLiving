import Agent from "../model/agent.model.js";
import validator from "validator";
import mongoose from "mongoose";

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

    // check if agent already exists
    const existingAgent = await Agent.findOne({ email});

    if(existingAgent) {
        return res.status(400).json({success: false,message: "Agent already exists"});
    }
    // create agent
    const agent = await Agent.create({
        name,
        email,
        password
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

    // return response
    return res.status(200).json({success: true, message: "Login successful", agent});
}

export{
    signUpAgent
}
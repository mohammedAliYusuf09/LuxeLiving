import jwt from "jsonwebtoken"
import Agent from "../model/agent.model.js"

export const verifyAgent = async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            return res.status(400).json({success: false, message: "Could not find access token"})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const agent = await Agent.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!agent) {
            return res.status(401).json({success: false, message: "Invalid access token"})
        }
    
        req.agent = agent;
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid access token"})
    }
    
}
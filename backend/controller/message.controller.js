import transporter from "../config/nodemailer.js";
import { Client } from "../model/client.model.js";
import { Message } from "../model/message.model.js";
import validator from "validator";

const sendMessageToAgent = async (req, res) => {
    const {name, email, message} = req.body;
    if(!name || !email || !message){
        return res.status(300).json( { success: false, message: "Fill all the filds currect" });
    }
    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({success: false, message: "Please provide a valid email"});
    }
    try {

        const doExist = await Client.findOne({email});
        

        if(doExist){
            return res.status(300).json({success: false, message: `${email} is allrady exists`})
        }

        const newClient = {
            name,
            email,
            message
        }
        const client = await Client.create(newClient)
        if(!client){
            return res.status(300).json({success: false, message: 'client is not created'});
        }

        const newMessage = {
            name,
            email,
            message,
        }

        const createdMessage = await Message.create(newMessage)

        if(!createdMessage){
            return res.status(300).json({success: false, message: 'message is not created'});
        }

        return res.status(200).json({success: true, message: "You have send a message",});
    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }


}

// Unauthorized 
const getOneClientMessageById = async (req, res) => {
    const { email } = req.agent;
    if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    } 

    const { id } = req.params;
    
    if (!id) {
        return res
        .status(400)
        .json({ success: false, message: "Message ID is required" });
    }

    try {
        const message = await Message.findById(id);

        if (!message) {
        return res
            .status(404)
            .json({ success: false, message: "Message not found" });
        }

    return res.status(200).json({ success: true, message });
    } catch (error) {
        console.error("Error fetching message:", error);
        return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }  
}

const getAllMessages = async (req, res) => {
    const { email } = req.agent;
    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const messages = await Message.find();
        if (messages.length === 0) {
        return res.status(404).json({ success: false, message: "No messages found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Gatting Messages successfully", messages});
    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }
}

const resopndClient = async (req, res) => {

    const { email } = req.agent;
    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {email : clientEmail , subject, respond} = req.body;

    if(!clientEmail || !subject || !respond){
        return res.status(300).json({ success: false, message: "Fill all the filds currect" });
    }

    try {
        const updatedMessage = await Message.findOneAndUpdate(
          { email: clientEmail },
          { firstRespond: respond },
          { new: true } 
        );

        if (!updatedMessage) {
          return res
            .status(403)
            .json({ success: false, message: "client message is not found" });
        }
         const maileOptions = {
                from: process.env.SENDER_EMAIL,
                to: clientEmail,
                subject: subject,
                text: respond
            }
            await transporter.sendMail(maileOptions);
    
        return res
            .status(200)
            .json({ success: true, message: "You have send a mail and message is saved" });

    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }
}

const mailToAllClient = async (req, res) => {
    const { email } = req.agent;
    if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { subject, message} = req.body;
    if(!subject || !message){
        return res.status(300).json({ success: false, message: "Fill all the filds currect" });
    }
    try {
        const clientsEmail = await Client.distinct('email');
        if (!clientsEmail || clientsEmail.length === 0) {
            return res
            .status(403)
            .json({ success: false, message: "No client emails found" });
            }
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: clientsEmail,
            subject: subject,
            text: message
        };    
        await transporter.sendMail(mailOptions);
        return res
            .status(200)
            .json({ success: true, message: "You have send a mail all you client" });
    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }

}

const allClients = async (req, res) => {
    const { email } = req.agent;

    if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const clients = await Client.find();
        if(!clients || clients.length == 0) {
            return res.status(403).json({ success: false, message: "No client found" });
        }

        return res.status(200).json({ success: true, message: "Clients found successfully", clients });
    } catch (error) {
        return res.status(400).json({success: false, message: "Internal server error"});
    }
}










export {
    sendMessageToAgent,
    getAllMessages,
    resopndClient,
    mailToAllClient,
    getOneClientMessageById,
    allClients
}
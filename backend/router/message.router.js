import express from 'express';
import { verifyAgent } from '../middleware/auth.middleware.js';
import { getAllMessages, mailToAllClient, resopndClient, sendMessageToAgent, getOneClientMessageById, allClients } from '../controller/message.controller.js';

const messageRouter = express.Router() 

messageRouter.post('/send-message', sendMessageToAgent)

// proceted routes
messageRouter.get('/getll-message', verifyAgent, getAllMessages)
messageRouter.patch('/resopnd-client', verifyAgent, resopndClient)
messageRouter.post('/send-mail-toall', verifyAgent, mailToAllClient)
messageRouter.get('/get-message/:id', verifyAgent, getOneClientMessageById)
messageRouter.get('/get-clients', verifyAgent, allClients)



export default messageRouter;


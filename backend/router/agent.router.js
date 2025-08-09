// SignUp and login routes for agent
import express from 'express';
import { chackIsLogdin, forgetPassword, logInAgent, logoutAgent, resetPassword, saveNewPassword, signUpAgent, validateOtp } from '../controller/agent.controller.js';
import { verifyAgent } from '../middleware/auth.middleware.js';

const agentRouter = express.Router();

agentRouter.post('/signup', signUpAgent);
agentRouter.post('/login', logInAgent);
agentRouter.post('/logout', logoutAgent);
agentRouter.post('/send-forget-password-otp', verifyAgent, forgetPassword);
agentRouter.post('/validate-otp', verifyAgent, validateOtp);
agentRouter.post('/save-new-password', verifyAgent, saveNewPassword);
agentRouter.get('/is-logedin', verifyAgent, chackIsLogdin);

agentRouter.post('/reset-password', verifyAgent, resetPassword);


export {
    agentRouter
}
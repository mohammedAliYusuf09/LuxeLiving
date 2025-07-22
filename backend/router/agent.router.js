// SignUp and login routes for agent
import express from 'express';
import { forgetPassword, logInAgent, logoutAgent, resetPassword, saveNewPassword, signUpAgent, validateOtp } from '../controller/agent.controller.js';
import { forgetPassword, logInAgent, logoutAgent, saveNewPassword, signUpAgent, validateOtp } from '../controller/agent.controller.js';
import { verifyAgent } from '../middleware/auth.middleware.js';

const agentRouter = express.Router();

agentRouter.post('/api/v1/signup', signUpAgent);
agentRouter.post('/api/v1/login', logInAgent);
agentRouter.post('/api/v1/logout', logoutAgent);
agentRouter.post('/api/v1/send-forget-password-otp', forgetPassword);
agentRouter.post('/api/v1/validate-otp', verifyAgent, validateOtp);
agentRouter.post('/api/v1/save-new-password', verifyAgent, saveNewPassword);

agentRouter.post('/api/v1/reset-password', verifyAgent, resetPassword);


export {
    agentRouter
}
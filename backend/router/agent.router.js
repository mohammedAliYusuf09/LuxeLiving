// SignUp and login routes for agent
import express from 'express';
<<<<<<< HEAD
import { forgetPassword, logInAgent, logoutAgent, resetPassword, saveNewPassword, signUpAgent, validateOtp } from '../controller/agent.controller.js';
=======
import { forgetPassword, logInAgent, logoutAgent, saveNewPassword, signUpAgent, validateOtp } from '../controller/agent.controller.js';
>>>>>>> c8aa585e3a1e2396f4ce33c5f9a270a993a67aa1
import { verifyAgent } from '../middleware/auth.middleware.js';

const agentRouter = express.Router();

agentRouter.post('/api/v1/signup', signUpAgent);
agentRouter.post('/api/v1/login', logInAgent);
agentRouter.post('/api/v1/logout', logoutAgent);
agentRouter.post('/api/v1/send-forget-password-otp', forgetPassword);
agentRouter.post('/api/v1/validate-otp', verifyAgent, validateOtp);
agentRouter.post('/api/v1/save-new-password', verifyAgent, saveNewPassword);
<<<<<<< HEAD
agentRouter.post('/api/v1/reset-password', verifyAgent, resetPassword);
=======
>>>>>>> c8aa585e3a1e2396f4ce33c5f9a270a993a67aa1

export {
    agentRouter
}
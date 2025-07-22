// SignUp and login routes for agent
import express from 'express';
import { forgetPassword, logInAgent, logoutAgent, signUpAgent, validateOtp } from '../controller/agent.controller.js';

const agentRouter = express.Router();

agentRouter.post('/api/v1/signup', signUpAgent);
agentRouter.post('/api/v1/login', logInAgent);
agentRouter.post('/api/v1/logout', logoutAgent);
agentRouter.post('/api/v1/send-forget-password-otp', forgetPassword);
agentRouter.post('/api/v1/validate-otp', validateOtp);

export {
    agentRouter
}
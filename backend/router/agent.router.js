// SignUp and login routes for agent
import express from 'express';
import { signUpAgent } from '../controller/agent.controller.js';

const agentRouter = express.Router();

agentRouter.post('/api/v1/signup', signUpAgent);

export {
    agentRouter
}
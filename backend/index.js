import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import { agentRouter } from './router/agent.router.js';

dotenv.config(
    {
        path: './.env',
    }
);
const app = express();

const port = process.env.PORT;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello server is running');
});

app.use('/', agentRouter)

app.listen(port,()=> {
    connectDB();
    console.log(`Server is runnign on port ${port}`)
})




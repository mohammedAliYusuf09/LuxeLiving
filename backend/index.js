import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import { agentRouter } from './router/agent.router.js';
import propertyRouter from './router/property.route.js';

dotenv.config(
    {
        path: './.env',
    }
);
const app = express();

const port = process.env.PORT;

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true,
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello server is running');
});

app.use('/api/v1/agent', agentRouter)
app.use('/api/v1/property', propertyRouter)

app.listen(port,()=> {
    connectDB();
    console.log(`Server is runnign on port ${port}`)
})




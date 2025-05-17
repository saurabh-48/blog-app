import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import userRouter from './app/routes/user_router.js';
import sequelize from './lib/sequelize.js';

const app = express();

app.use(cors());
// middle ware for request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/blog-app', userRouter);

const server = http.createServer(app);

export default server;

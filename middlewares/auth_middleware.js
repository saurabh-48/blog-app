import jwt from "jsonwebtoken";
import { LogFactory } from "../lib/logger.js";

const verifyAccessToken = ((req, res, next) => {
    console.log
    const token = req.header('Authorization');
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user_id = decoded.user_id;
        next();
    } catch(error){
        LogFactory.getLogger().error('Invalid Token')
        next();
    }
});

export default verifyAccessToken;
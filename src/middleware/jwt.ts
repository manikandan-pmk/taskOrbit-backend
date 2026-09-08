import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';

const middleware = (req:Request , res:Response , next:NextFunction)=>{
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        req.body.user = decoded;
        next();

    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Middleware error"
        })
    }

}
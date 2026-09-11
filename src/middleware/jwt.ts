import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user? : JwtPayload
}

const Auth = (req:AuthRequest , res:Response , next:NextFunction)=>{
    try {

        const token = req.cookies?.token;
        console.log(token)

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        console.log(decoded)

        req.user = decoded;
        next();

    }catch(err){
        console.error("MIDDLEWARE ERROR:", err);

        return res.status(500).json({
            error:true,
            message:"Middleware error"
        })
    }

}

export default Auth;
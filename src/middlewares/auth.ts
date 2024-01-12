import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";
import { userService } from "../services/userService.js";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from '../models/Users.js';

export interface AuthorizationRequest extends Request {
    user?: UserInstance | null 
}

export function ensureAuth(req:AuthorizationRequest, res:Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization
    
    if(!authorizationHeader) return res.status(401).json({message: 'Unauthorized: no token was found'})

    const token = authorizationHeader.replace(/Bearer /, '')

      jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === "undefined") {
          return res
            .status(401)
            .json({ message: "Não autorizado: token inválido" });
        }

        userService.findUserByEmail((decoded as JwtPayload).email).then((user) => {
          req.user = user;
          next();
        });
      });
    

}
import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";
import { userService } from "../services/userService.js";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/Users.js";
import { AuthenticationOptions } from "@adminjs/express";

export interface AuthorizationRequest extends Request {
  user?: UserInstance | null;
}

export async function ensureAuth(req: AuthorizationRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) return res.status(401).json({ message: "Unauthorized: no token was found" });

  const token = authorizationHeader.replace(/Bearer /, "");

  await jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res.status(401).json({ message: "Unauthorized: invalid token" });
    }

   const user = await userService.findUserByEmail((decoded as JwtPayload).email);
   req.user = user;
   next();
  });
}

export async function ensureAuthViaQuery(req: AuthorizationRequest, res: Response, next: NextFunction) {
  const { token } = req.query;

  if (!token) return res.status(401).json({ message: "Unauthorized: no token was found" });
  if (typeof token !== "string") return res.status(400).json({ message: "The params token must be the type of string" });

  await jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") return res.status(401).json({ message: "Unauthorized: invalid token" });
    const user = await userService.findUserByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}

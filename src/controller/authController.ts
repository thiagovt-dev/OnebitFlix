import { Request, Response } from "express";
import { userService } from '../services/userService.js';
import { jwtService } from "../services/jwtService.js";

export const authController = {
    register: async (req:Request, res: Response)=>{
        const { firstName, lastName, email, password, phone, birth } = req.body;
        try {
            const userAlreadyExists = await userService.findUserByEmail(email)
            if(userAlreadyExists) throw new Error ('This email already exist.')

            const newUser = await userService.createUser({
              firstName,
              lastName,
              email,
              password,
              phone,
              birth,
              role: 'user'
            });
            return res.status(201).json(newUser)
        } catch (err) {
            if(err instanceof Error) return res.status(400).json({message: err.message})
        }
    },
    login: async (req:Request, res: Response) => {
        const { email, password} = req.body
        try {
            const user= await userService.findUserByEmail(email)

            if(!user) return res.status(404).json({message: 'Email not found.'})

            user.checkPassword(password, (err, isSame)=>{
                if (err) return res.status(400).json({message: err.message})
                if(!isSame) return res.status(401).json({message: 'Your password is incorrect'})

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
                const token = jwtService.signToken(payload, '1d')

                return res.status(201).json({ authenticated: true, ...payload, token });
            })
        } catch (err) {
            if (err) {
              if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
              }
            }
        }
    }
}
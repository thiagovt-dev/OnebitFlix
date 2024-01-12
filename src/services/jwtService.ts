import jwt from 'jsonwebtoken'

const secretKey = 'chave-do-jwt'

export const jwtService ={
    signToken: (payload: string | object | Buffer, expiration: string) =>{
        return jwt.sign(payload, secretKey, {expiresIn: expiration})
    }
}
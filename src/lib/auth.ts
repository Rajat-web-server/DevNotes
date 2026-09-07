import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(userId: number){
    return await new SignJWT({userId})
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret)
}
export async function verifyToken(Token:string){
    const {payload} = await jwtVerify(Token, secret);

    return payload;
}

export async function getCurrentUser(request:NextRequest){
    const token = request.cookies.get("token")?.value;

    if(!token){
        return null;
    }

    try{
        const payload = await verifyToken(token)
        return payload.userId;
    }catch{
         return null;
    }
}
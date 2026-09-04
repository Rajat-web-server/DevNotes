import { SignJWT, jwtVerify } from "jose";

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
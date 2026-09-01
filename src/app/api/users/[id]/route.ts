import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request:NextRequest,
    {params}:{
        params: Promise<{id:string}>
    }
){
 try{
    const {id}= await params;
    const user= await prisma.users.findUnique({
        where:{
            id: Number(id)
        },
    })
    if(!user){
        return NextResponse.json({
            Message:"the user is not available"
        })
    }
    return NextResponse.json({
        Message:"The dynamic routing is succesfull",
        user
    })
 }
 catch(error){
    console.log(error)
    return NextResponse.json({
        message:"There is an error",
        error
    })
 }
}
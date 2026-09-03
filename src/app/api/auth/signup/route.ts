import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export  function GET():NextResponse{
    try{
        
        return NextResponse.json({
            message:"This is the signup page"
        })
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message:"There's an error",
            error
        })
    }

}

export async  function POST(request:NextRequest){
    try{
        const body = await request.json();

        const [name, email, password]= body;

        const existUser = await prisma.users.findUnique({
            where:{
                email: email,
            }
        });
        if (existUser){
            return NextResponse.json({
                message: "User already exist"
            },{
                status:401
            })
        }

        const hashedPassword = await hash(password,12);

        const user = await prisma.users.create({
            data:{
                name:name,
                email:email,
                password_hash:hashedPassword
            }
        })

        return NextResponse.json({
            message: "The signup has been done",
            data:{
                name:user.name,
                email:user.email
            }
            
        })

    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: "There is an error",
            error
        },{
            status:500
        })
    }
}
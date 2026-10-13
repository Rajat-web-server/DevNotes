import { NextResponse } from "next/server";

export function Post (){
    const response = NextResponse.json({
        message:"Logout Succesfull",
    })
    response.cookies.delete("token");
    return response;
}
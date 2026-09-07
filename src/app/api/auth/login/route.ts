import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { createToken } from "@/lib/auth";

export function GET(): NextResponse {
  try {
    return NextResponse.json({
      message: "This is the Login page",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "There's an error",
      error,
    });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }
    
    const comparePassword = await compare(password, user.password_hash);
    
    if(!comparePassword){
        return NextResponse.json(
            {
                message: "Invalid email or password",
            },
            { status: 401 }
        );
    }
    const token = await createToken(user.id)

const response = NextResponse.json(
      {
        message: "The Login has been done",
        token: token,
        data: {
          email: user.email,
          name: user.name,
        },
      },
      {
        status: 201,
      },
    );
    response.cookies.set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        maxAge: 60*60*24,
        path:"/",
})
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "There's an error",
      error,
    });
  }
}

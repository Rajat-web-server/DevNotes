import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

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

    return NextResponse.json(
      {
        message: "The Login has been done",

        data: {
          email: user.email,
          name: user.name,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "There's an error",
      error,
    });
  }
}

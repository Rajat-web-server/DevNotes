import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader =  request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          message: "Authorization header is missing",
        },
        {
          status: 401,
        },
      );
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          message: "The token is missing",
        },
        {
          status: 401,
        },
      );
    }

    const payload = await verifyToken(token);
    return NextResponse.json({
      message: "Token is valid",
      userId: payload.userId,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "There's an error",
      error,
    });
  }
}

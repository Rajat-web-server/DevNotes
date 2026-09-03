import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { compare } from "bcryptjs";


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
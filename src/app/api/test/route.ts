import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export function GET(): NextResponse {
  try {
    const users =  prisma.users.findMany();
    return NextResponse.json(
        {
      message: "Devnotes APi is working",
      users : users,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 },
    );
  }
}

export async function POST(request:NextRequest):Promise<NextResponse> {

    const body= await request.json()

  return NextResponse.json({
    message: "Creating Data",
    body: body
  });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({
    message: "Editing Data",
  });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({
    message: "Deleting Data",
  });
}

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.users.findMany();

    return NextResponse.json(
      {
        message: "Devnotes APi is workings",
        users: users,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const user = await prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
        password_hash: body.password,
      },
    });

    return NextResponse.json(
      {
        message: "Creating Data",
        user: user,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "There's an error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
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

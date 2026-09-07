import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const notes = await prisma.notes.findMany();

    return NextResponse.json(
      {
        message: "Devnotes APi is workings",
        notes: notes,
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
    // const token = request.cookies.get("token")?.value;
    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // const payload = await verifyToken(token);
    const userId = await getCurrentUser(request);
      if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const body = await request.json();
    const note = await prisma.notes.create({
      data: {
        title: body.title,
        content: body.content,
        bg_color: body.bg_color,
        users_Id: Number(userId),
      },
    });
    return NextResponse.json({
      message: "Creating Data",
      notes: note,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "There's an error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

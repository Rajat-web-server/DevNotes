import { NextResponse, NextRequest } from "next/server";
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
    const body = await request.json();

    const note = await prisma.notes.create({
      data: {
        title: body.title,
        content: body.content,
        bg_color: body.bg_color,
        users_Id: body.users_Id,
      },
    });
    return NextResponse.json({
      message: "Creating Data",
      notes: note,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "There's an error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

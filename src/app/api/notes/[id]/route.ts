import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const userId = await getCurrentUser(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await params;
    const note = await prisma.notes.findUnique({
      where: {
        id: Number(id),
        users_Id: Number(userId),
      },
    });
    if (!note) {
      return NextResponse.json({
        Message: "the note is not available",
      });
    }
    return NextResponse.json({
      Message: "The dynamic routing is succesfull",
      note,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "There is an error",
      error,
    });
  }
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const userId = await getCurrentUser(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await params;
    const body = await request.json();
    const updatedNote = await prisma.notes.update({
      where: {
        id: Number(id),
        users_Id: Number(userId),
      },
      data: {
        title: body.title,
        content: body.content,
        bg_color: body.bg_color,
      },
    });
    // console.log(body)
    // console.log(updatedUser)
    return NextResponse.json(
      {
        message: "Note updated successfully!",
        note: updatedNote,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        Message: "There is an error",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const userId = await getCurrentUser(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await params;

    const deleteNote = await prisma.notes.delete({
      where: {
        id: Number(id),
        users_Id: Number(userId),
      },
    });
    if (!deleteNote) {
      return NextResponse.json({
        message: "The note is not there",
      });
    }
    return NextResponse.json({
      message: "The note has been deleted",
      user: deleteNote,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "There has been an error",
        error,
      },
      { status: 500 },
    );
  }
}

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return NextResponse.json({
        Message: "the user is not available",
      });
    }
    return NextResponse.json({
      Message: "The dynamic routing is succesfull",
      user,
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
    const { id } = await params;
    const body = await request.json();
    const updatedUser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        email: body.email,
      },
    });
    // console.log(body)
    // console.log(updatedUser)
    return NextResponse.json(
      {
        message: "User updated successfully!",
        user: updatedUser,
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
    const { id } = await params;

    const deleteUser = await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deleteUser) {
      return NextResponse.json({
        message: "The user is not there",
      });
    }
    return NextResponse.json({
      message: "The user has been deleted",
      user: deleteUser,
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

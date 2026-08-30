import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.users.findMany();
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

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({
    message: "Creating Data",
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

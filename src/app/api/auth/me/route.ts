import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUser(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Auth/me error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
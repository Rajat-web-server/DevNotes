import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET():Promise<NextResponse>{
    try{
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
    }
    catch(error){
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
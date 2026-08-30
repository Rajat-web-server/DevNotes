import { NextResponse } from "next/server";

export async function GET():Promise<NextResponse>{
    return NextResponse.json({
        message:"Devnotes APi is working"
    })
}

export async function POST():Promise<NextResponse>{
    return NextResponse.json({
        message:"Creating Data",
    })
}

export async function PUT():Promise<NextResponse>{
    return NextResponse.json({
        message:"Editing Data",
    })
}

export async function DELETE():Promise<NextResponse>{
    return NextResponse.json({
        message:"Deleting Data",
    })
}
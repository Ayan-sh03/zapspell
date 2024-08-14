import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req : NextRequest){
    const body = await req.json()
    try {
        await fetch(`${process.env.SERVER_URL}/api/v1/attempt/add`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${cookies().get("token")?.value}`
            },
            method:"POST",
            body:JSON.stringify(body)
        })
    
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ message: "ok" }, { status: 200 });
    
}
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "edge";
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/attempt/add`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

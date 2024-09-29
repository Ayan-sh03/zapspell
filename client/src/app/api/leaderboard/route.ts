import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/leaderboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {}
}

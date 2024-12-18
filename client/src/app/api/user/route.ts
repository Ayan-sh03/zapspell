import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(request: Request) {
  const res = await fetch(`${process.env.SERVER_URL}/api/v1/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  if (res.status === 401) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!res.ok)
    return NextResponse.json(
      { message: "Failed to fetch user data" },
      { status: 500 }
    );
  const data = await res.json();

  return NextResponse.json({ data }, { status: 200 });
}

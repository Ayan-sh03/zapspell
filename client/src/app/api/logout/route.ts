import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
};

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  //get the query params
  const { searchParams } = new URL(req.url);
  const diff= searchParams.get("difficulty");

  const res = await fetch(`${process.env.SERVER_URL}/api/v1/word/random?difficulty=${diff}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  
  // console.log(res);
  const data = await res.json();
  console.log(data);

  return NextResponse.json({ word: data.word, id: data.id });
}

export async function POST(req: NextRequest) {
  const { username, wordId, attemptWord, isCorrect } = await req.json();

  try {
    const body = JSON.stringify({
      username,
      word_id: wordId,
      attempt_word: attemptWord,
      is_correct: isCorrect,
    });

    const res = await fetch(`${process.env.SERVER_URL}/api/v1/attempt/add`, {
      method: "POST",
      body,
    });

    if (!res.ok) {
      const error = await res.json();

      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "ok" }, { status: 200 });
}

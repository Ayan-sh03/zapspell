"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  const data = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("Registration data:", JSON.stringify(data));

  const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // const errorBody = await res.text();
    // console.error("Error response:", res.status, errorBody);
    throw new Error(`Failed to register: ${res.status} `);
  }

  const { token } = await res.json();
  console.log("Registration successful, setting cookie");
  console.log("Token:", token);

  const month = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  cookies().set("token", token, {
    expires: new Date(Date.now() + month),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });

  console.log("Cookie set, revalidating and redirecting");
  revalidatePath("/", "layout");
  redirect("/");
}
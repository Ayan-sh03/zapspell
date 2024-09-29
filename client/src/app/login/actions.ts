"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  
    const email=  formData.get("email") 
    const password = formData.get("password") 


    console.log("Login data:", { email, password });


    const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    });
    

  if (!res.ok) {
    console.log("====================================");
    console.log("Error while fetching");
    console.log("====================================");
    throw new Error("Failed to Fetch");
  }

  const {token} = await res.json()
  const month = 1 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  cookies().set("token", token, {
    expires: new Date(Date.now() + month),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });


  revalidatePath("/", "layout");
  redirect("/");
}

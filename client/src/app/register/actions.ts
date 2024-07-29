"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export async function register(formData: FormData) {
  const data = {
    first_name: formData.get("firstName") ,
    last_name: formData.get("lastName") ,
    email: formData.get("email") ,
    password: formData.get("password") ,
  };

  console.log('====================================');
  console.log(JSON.stringify(data));
  console.log('====================================');

  const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("====================================");
    console.log("Error while fetching");
    console.log("====================================");
    throw new Error("Failed to Fetch");
  }

  const {token} = await res.json()
  const month = 24 * 60 * 60 * 1000 * 30
  cookies().set('token', token, { expires: Date.now() - month })



  revalidatePath("/", "layout");
  redirect("/");
}

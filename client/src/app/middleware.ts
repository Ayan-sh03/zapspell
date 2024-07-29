import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

console.log('====================================');
console.log('Request:', request.nextUrl.pathname);
console.log('====================================');
    const token = request.cookies.get("token");

  if (token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

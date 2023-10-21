import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard") && !authTokens) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }
  if (authTokens && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard(.*)", "/login"],
};

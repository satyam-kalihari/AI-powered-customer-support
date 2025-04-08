// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose for JWT verification in Edge runtime

// Paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/chat",
  "/tickets",
  "/analytics",
  "/settings",
  "/customers",
];

// Paths that should redirect to dashboard if already authenticated
const authPaths = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Check if token is valid
  let isAuthenticated = false;

  if (token) {
    try {
      // Use jose for JWT verification in Edge runtime
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // If accessing a protected path and not authenticated, redirect to login
  if (
    protectedPaths.some((path) => pathname.startsWith(path)) &&
    !isAuthenticated
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // If accessing auth paths and already authenticated, redirect to dashboard
  if (authPaths.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)"],
};

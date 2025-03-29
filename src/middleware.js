import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"

export async function middleware(request) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  // Redirect authenticated users away from sign-in/sign-up pages
  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

// Define which routes the middleware should run on
export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
  //                                   , "/dashboard/:path*"
}

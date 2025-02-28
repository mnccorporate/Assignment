import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const supabase = createMiddlewareClient({ req: request, res: response });
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase Session Fetch Error:", error.message);
      return NextResponse.redirect(new URL("/login?error=session_fetch", request.url));
    }

    const session = data?.session ?? null;
    const { pathname } = request.nextUrl;

    console.log("Middleware Session:", session);

    // Define protected and authentication routes
    const protectedPaths = ["/dashboard", "/settings"];
    const authRoutes = ["/login", "/register"];

    if (!session) {
      // Redirect unauthenticated users from protected routes to login
      if (protectedPaths.some((path) => pathname.startsWith(path))) {
        console.warn("No session found, redirecting to login");
        return NextResponse.redirect(new URL(`/login?redirectedFrom=${pathname}`, request.url));
      }
    } else {
      // Redirect authenticated users away from auth routes
      if (authRoutes.includes(pathname)) {
        console.warn("User already authenticated, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch (err) {
    console.error("Middleware Error:", err);
    return NextResponse.redirect(new URL("/login?error=middleware_error", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

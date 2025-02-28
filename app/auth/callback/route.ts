import { createServerSupabase } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth Callback Error:", error.message);
    return NextResponse.redirect(new URL("/login?error=auth_failed", requestUrl.href));
  }

  // ✅ Store session securely in a Base64-encoded format
  const sessionString = Buffer.from(JSON.stringify(data.session)).toString("base64");

  cookies().set("supabase-auth-token", sessionString, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.redirect(new URL("/dashboard", requestUrl.href));
}

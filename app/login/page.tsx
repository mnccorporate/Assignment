import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { createServerSupabase } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  try {
    const supabase = createServerSupabase();
    
    // Fetch session safely
    const { data: { session }, error } = await supabase.auth.getSession();

    // If user is already logged in, redirect to dashboard
    if (session?.user) {
      redirect("/dashboard");
    }

    if (error) {
      console.error("Supabase session error:", error.message);
    }
  } catch (error) {
    console.error("Unexpected error fetching session:", error);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        
        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/reset-password" className="hover:text-brand underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
}

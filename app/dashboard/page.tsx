import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/dashboard/user-profile";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering

export default async function DashboardPage() {
  const supabase = createServerSupabase();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session?.user) {
    console.error("Authentication error or no active session:", error);
    return redirect("/login"); // Redirect if not authenticated
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text={`Welcome back, ${session.user.email}`} />
      <div className="grid gap-8">
        <UserProfile user={session.user} />
      </div>
    </DashboardShell>
  );
}

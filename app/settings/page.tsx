export const dynamic = "force-dynamic"; // Ensure dynamic rendering

import { createServerSupabase } from "@/lib/supabase/server"; // ✅ FIX: Correct import
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsForm } from "@/components/settings/settings-form";

export default async function SettingsPage() {
  const supabase = createServerSupabase();

  const { data: sessionData, error } = await supabase.auth.getSession();

  if (error || !sessionData?.session) {
    console.error("Supabase authentication error:", error);
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />
      <div className="grid gap-8">
        <SettingsForm user={sessionData.session.user} />
      </div>
    </DashboardShell>
  );
}

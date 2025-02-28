"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Shield className="h-6 w-6" />
        <span className="font-bold">Auth Assessment</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/settings"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/settings")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
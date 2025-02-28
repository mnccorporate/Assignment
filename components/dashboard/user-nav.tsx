"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

export function UserNav() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []); // ✅ Memoized Supabase client
  const [email, setEmail] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("U");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const user = data?.session?.user;
        if (user?.email) {
          setEmail(user.email);
          setInitials(user.email.charAt(0).toUpperCase());
        }
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
      }
    };

    getUser();
  }, [supabase]); // ✅ Now includes `supabase` in dependencies

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Account</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

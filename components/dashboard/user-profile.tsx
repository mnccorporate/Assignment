import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Your account details and profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Email</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">User ID</p>
          <p className="text-sm text-muted-foreground">{user.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Last Sign In</p>
          <p className="text-sm text-muted-foreground">
            {user.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString()
              : "Never"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Created At</p>
          <p className="text-sm text-muted-foreground">
            {user.created_at
              ? new Date(user.created_at).toLocaleString()
              : "Unknown"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
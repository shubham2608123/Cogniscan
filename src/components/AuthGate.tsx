import { useAuth } from "@/lib/auth";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "./AppShell";
import { Brain } from "lucide-react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/auth" });
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Brain className="h-10 w-10 text-primary animate-pulse" />
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}

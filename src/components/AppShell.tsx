import { Link, useRouter } from "@tanstack/react-router";
import { Brain, LayoutDashboard, Activity, Gamepad2, BarChart3, MessageCircle, LogOut, Menu, X, Bell, BookLock } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tests", label: "Tests", icon: Activity },
  { to: "/exercises", label: "Exercises", icon: Gamepad2 },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/memory-vault", label: "Memory Vault", icon: BookLock },
  { to: "/assistant", label: "AI Assistant", icon: MessageCircle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = router.state.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="min-h-dvh bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Brain className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">Cogniscan</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = path.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      active
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl bg-primary/5 -z-10"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>

              <div className="hidden sm:flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs text-muted-foreground leading-tight">Welcome back,</p>
                  <p className="text-sm font-semibold text-foreground leading-tight">{profile?.full_name?.split(" ")[0] || "User"}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="hidden lg:flex text-muted-foreground hover:text-foreground ml-1"
              >
                <LogOut className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <nav className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = path.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/5 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-2 mt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground"
                    onClick={signOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}

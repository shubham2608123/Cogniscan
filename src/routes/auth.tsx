import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signIn, signUp } from "@/lib/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"patient" | "caregiver">("patient");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      router.navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
      toast.success("Account created!");
      router.navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/5 via-blue-50/50 to-background items-center justify-center p-12">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">Cogniscan</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground leading-tight mb-4">
            Your mind's health, monitored with care and AI.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Detect early cognitive changes with AI-powered tests, brain exercises, and personalized insights.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              Private & secure
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              AI-powered
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 items-center justify-center shadow-glow mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to Cogniscan</h1>
            <p className="text-muted-foreground mt-1 text-sm">Your personal cognitive health companion.</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-foreground">Get started</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account or create a new one.</p>
          </div>

          <div className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
            <Tabs defaultValue="signin">
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-muted">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="si-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="si-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border focus:border-primary focus:ring-primary/20"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="si-password" className="text-sm font-medium">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="si-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 rounded-xl border-border focus:border-primary focus:ring-primary/20 pr-10"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl font-medium shadow-glow hover:shadow-lg transition-all hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="su-name" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="su-name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border focus:border-primary focus:ring-primary/20"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="su-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="su-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl border-border focus:border-primary focus:ring-primary/20"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="su-password" className="text-sm font-medium">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="su-password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 rounded-xl border-border focus:border-primary focus:ring-primary/20 pr-10"
                        placeholder="Min 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">I am a...</Label>
                    <RadioGroup value={role} onValueChange={(v) => setRole(v as "patient" | "caregiver")} className="mt-2 grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                        <RadioGroupItem value="patient" />
                        <span className="text-sm font-medium">Patient</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                        <RadioGroupItem value="caregiver" />
                        <span className="text-sm font-medium">Caregiver</span>
                      </label>
                    </RadioGroup>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl font-medium shadow-glow hover:shadow-lg transition-all hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

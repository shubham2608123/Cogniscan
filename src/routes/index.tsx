import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Brain, Sparkles, Activity, Shield, ArrowRight, Mic, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.navigate({ to: "/dashboard" });
  }, [loading, user, router]);

  return (
    <div className="min-h-dvh bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />

      {/* Nav */}
      <header className="px-6 lg:px-10 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Cogniscan</span>
        </Link>
        <Link to="/auth">
          <Button variant="ghost">Login</Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto pt-12 lg:pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium mb-6 border border-primary/10">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered cognitive health
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Your mind&rsquo;s health, monitored with care and AI.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Cogniscan detects early signs of cognitive change through smart tests, brain exercises, and personalized AI insights — gently, privately, every day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 px-7 h-12 text-base shadow-glow hover:shadow-lg transition-all">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="px-7 h-12 text-base rounded-xl">
                  I already have an account
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Private & secure</span>
              <span className="flex items-center gap-1.5"><Activity className="h-4 w-4" /> Daily streaks</span>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-primary/5 to-purple-500/5 flex items-center justify-center p-12">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-primary/10" />
              <div className="relative w-full aspect-square rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
                <Brain className="h-32 w-32 text-primary" strokeWidth={1.2} />
                <div className="absolute top-6 right-8 h-12 w-12 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute bottom-10 left-6 h-12 w-12 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div className="absolute top-1/2 -right-4 h-12 w-12 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-center">
                  <Mic className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Brain, title: "Smart Cognitive Tests", desc: "Memory, pattern recognition, and reaction tests build your personal baseline." },
            { icon: Smile, title: "Multimodal AI Analysis", desc: "Combines speech, expression and behavioral cues to detect subtle changes." },
            { icon: Activity, title: "Personalized Brain Plan", desc: "Daily exercises tailored to strengthen your weakest cognitive areas." },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
                className="p-6 rounded-[20px] bg-card border border-border shadow-soft hover:shadow-card-hover transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Cogniscan · A preventive cognitive health companion
      </footer>
    </div>
  );
}

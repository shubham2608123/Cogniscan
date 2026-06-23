import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { aggregateScores, levelFromScore, type TestResult } from "@/lib/cognitive";
import { Brain, Activity, Gamepad2, Flame, TrendingUp, BarChart3, Sparkles, ArrowRight, Zap, Target, BookLock, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getMemoryStats } from "@/lib/memory-vault";

export const Route = createFileRoute("/dashboard")({
  component: () => <AuthGate><Dashboard /></AuthGate>,
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Dashboard() {
  const { user, profile } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [exerciseSessions, setExerciseSessions] = useState<{ exercise_type: string; score: number; created_at: string }[]>([]);
  const [memStats, setMemStats] = useState<Awaited<ReturnType<typeof getMemoryStats>> | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const testData = await api.tests.getAll();
      setResults((testData ?? []) as TestResult[]);

      const { count } = await api.exercises.getCount();
      setExerciseCount(count ?? 0);

      const exData = await api.exercises.getAll();
      setExerciseSessions((exData ?? []) as { exercise_type: string; score: number; created_at: string }[]);

      const ms = await getMemoryStats(user.id);
      setMemStats(ms);
    })();
  }, [user]);

  const scores = aggregateScores(results);
  const level = levelFromScore(scores.overall);
  const hasData = results.length > 0;

  function exerciseAvg(type: string) {
    const sessions = exerciseSessions.filter((s) => s.exercise_type === type);
    if (sessions.length === 0) return 0;
    return Math.round(sessions.reduce((a, b) => a + b.score, 0) / sessions.length);
  }
  function exerciseBest(type: string) {
    const sessions = exerciseSessions.filter((s) => s.exercise_type === type);
    if (sessions.length === 0) return 0;
    return Math.max(...sessions.map((s) => s.score));
  }
  function exerciseCountOf(type: string) {
    return exerciseSessions.filter((s) => s.exercise_type === type).length;
  }

  const spatialMemoryScore = exerciseAvg("memory-room");
  const visualAttentionScore = exerciseAvg("visual-change");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mt-1">Your cognitive overview</h1>
          <p className="text-muted-foreground mt-1">Track your progress and improve your cognitive skills.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-50 border border-orange-100">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-bold text-orange-600">{profile?.current_streak ?? 0}</span>
          <span className="text-sm text-orange-500">day streak</span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Brain}
          label="Cognitive Score"
          value={hasData ? `${scores.overall}` : "0"}
          sub={hasData ? level.label : "Take a test to get started"}
          accent={level.color}
          bgClass="bg-blue-50"
          borderClass="border-blue-100"
          iconBg="bg-blue-100 text-blue-600"
          progress={hasData ? scores.overall : 0}
        />
        <StatCard
          icon={BookLock}
          label="Memory Vault Avg Score"
          value={memStats ? `${memStats.avgScore}` : "0"}
          sub={memStats && memStats.totalTests > 0 ? `${memStats.totalTests} tests taken` : "Take a memory test"}
          accent="text-primary"
          bgClass="bg-indigo-50"
          borderClass="border-indigo-100"
          iconBg="bg-indigo-100 text-indigo-600"
          progress={memStats?.avgScore ?? 0}
        />
        <StatCard
          icon={Activity}
          label="Tests Taken"
          value={`${results.length}`}
          sub="Start your first test"
          bgClass="bg-blue-50"
          borderClass="border-blue-100"
          iconBg="bg-blue-100 text-blue-500"
        />
        <StatCard
          icon={Gamepad2}
          label="Exercises"
          value={`${exerciseCount}`}
          sub="Try some exercises"
          bgClass="bg-purple-50"
          borderClass="border-purple-100"
          iconBg="bg-purple-100 text-purple-600"
        />
      </motion.div>

      {/* Memory Vault Stats */}
      {memStats && memStats.totalMemories > 0 && (
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-3">
            <BookLock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Memory Vault</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Brain} label="Memory Recall Score" value={`${memStats.avgScore}`} sub="avg accuracy" accent="text-primary" bgClass="bg-indigo-50" borderClass="border-indigo-100" iconBg="bg-indigo-100 text-indigo-600" progress={memStats.avgScore} />
            <StatCard icon={Target} label="Memory Tests Taken" value={`${memStats.totalTests}`} sub="all-time" bgClass="bg-blue-50" borderClass="border-blue-100" iconBg="bg-blue-100 text-blue-600" />
            <StatCard icon={BookLock} label="Memory Entries" value={`${memStats.totalMemories}`} sub="in your vault" bgClass="bg-purple-50" borderClass="border-purple-100" iconBg="bg-purple-100 text-purple-600" />
            <StatCard icon={TrendingUp} label="Weekly Improvement" value={`${memStats.weeklyImprovement > 0 ? "+" : ""}${memStats.weeklyImprovement}%`} sub="vs last week" bgClass="bg-green-50" borderClass="border-green-100" iconBg="bg-green-100 text-green-600" />
          </div>
        </motion.div>
      )}

      {/* Cognitive Areas */}
      <motion.div variants={item}>
        <section className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Cognitive Areas</h2>
              <p className="text-sm text-muted-foreground">Your performance across core domains</p>
            </div>
            <Link to="/insights">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 gap-2 rounded-xl">
                <BarChart3 className="h-4 w-4" />
                View Insights
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <AnimatedBar icon={Brain} label="Memory" value={scores.memory} color="from-primary to-blue-500" />
            <AnimatedBar icon={Target} label="Pattern Recognition" value={scores.pattern} color="from-emerald-500 to-teal-500" />
            <AnimatedBar icon={Zap} label="Reaction Speed" value={scores.reaction} color="from-amber-500 to-orange-500" />
            <AnimatedBar icon={MapPin} label="Spatial Memory" value={spatialMemoryScore} color="from-indigo-500 to-purple-500" />
            <AnimatedBar icon={Eye} label="Visual Attention" value={visualAttentionScore} color="from-teal-500 to-cyan-500" />
            {memStats && memStats.totalMemories > 0 && (
              <AnimatedBar icon={BookLock} label="Personal Memory Recall" value={memStats.avgScore} color="from-indigo-500 to-purple-500" />
            )}
          </div>
          {!hasData && (
            <div className="mt-5 p-4 bg-blue-50/50 rounded-xl text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              Take your first test to start building your cognitive baseline.
            </div>
          )}
        </section>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid md:grid-cols-4 gap-4">
        <ActionCard
          to="/tests"
          icon={Activity}
          title="Take a Test"
          desc="Assess your cognitive abilities"
          bgClass="bg-blue-50"
          iconBg="bg-blue-100 text-blue-600"
          arrowBg="bg-blue-500"
        />
        <ActionCard
          to="/exercises"
          icon={Gamepad2}
          title="Brain Exercise"
          desc="Train your brain with exercises"
          bgClass="bg-green-50"
          iconBg="bg-green-100 text-green-600"
          arrowBg="bg-green-500"
        />
        <ActionCard
          to="/memory-vault"
          icon={BookLock}
          title="Memory Vault"
          desc="Upload and recall personal memories"
          bgClass="bg-indigo-50"
          iconBg="bg-indigo-100 text-indigo-600"
          arrowBg="bg-indigo-500"
        />
        <ActionCard
          to="/insights"
          icon={BarChart3}
          title="View Insights"
          desc="See your detailed progress"
          bgClass="bg-purple-50"
          iconBg="bg-purple-100 text-purple-600"
          arrowBg="bg-purple-500"
        />
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  bgClass,
  borderClass,
  iconBg,
  progress,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  accent?: string;
  bgClass: string;
  borderClass: string;
  iconBg: string;
  progress?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.2 }}
      className={`${bgClass} border ${borderClass} rounded-[20px] p-5 cursor-default`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
        <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-3xl font-bold tracking-tight ${accent ?? ""}`}>{value}</span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-white/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 animate-progress transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}

function AnimatedBar({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary/70" />
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function ActionCard({
  to,
  icon: Icon,
  title,
  desc,
  bgClass,
  iconBg,
  arrowBg,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  bgClass: string;
  iconBg: string;
  arrowBg: string;
}) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)" }}
        transition={{ duration: 0.2 }}
        className={`${bgClass} border border-border rounded-[20px] p-5 cursor-pointer h-full`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
          <div className={`h-10 w-10 rounded-full ${arrowBg} flex items-center justify-center shrink-0`}>
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

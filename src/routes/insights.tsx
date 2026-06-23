import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { aggregateScores, levelFromScore, type TestResult } from "@/lib/cognitive";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Trash2, TrendingUp, TrendingDown, Minus, Brain, MapPin, Eye } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/insights")({
  component: () => <AuthGate><Insights /></AuthGate>,
});

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Insights() {
  const { user, profile, refreshProfile } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const [exerciseSessions, setExerciseSessions] = useState<{ exercise_type: string; score: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user) load(); }, [user]); // eslint-disable-line

  async function load() {
    if (!user) return;
    const data = await api.tests.getAll();
    setResults((data ?? []) as TestResult[]);

    const exData = await api.exercises.getAll();
    setExerciseSessions((exData ?? []) as { exercise_type: string; score: number; created_at: string }[]);

    setLoading(false);
  }

  const scores = aggregateScores(results);
  const level = levelFromScore(scores.overall);

  const byDay: Record<string, { day: string; score: number; count: number }> = {};
  results.forEach((r) => {
    const day = r.created_at.slice(0, 10);
    const norm = (r.score / r.max_score) * 100;
    if (!byDay[day]) byDay[day] = { day, score: 0, count: 0 };
    byDay[day].score += norm;
    byDay[day].count += 1;
  });
  const chartData = Object.values(byDay).map((d) => ({ day: d.day.slice(5), score: Math.round(d.score / d.count) }));

  let trend: "up" | "down" | "flat" = "flat";
  if (chartData.length >= 2) {
    const first = chartData[0].score;
    const last = chartData[chartData.length - 1].score;
    if (last - first > 5) trend = "up";
    else if (first - last > 5) trend = "down";
  }

  function exerciseTrend(type: string) {
    const sessions = exerciseSessions.filter((s) => s.exercise_type === type);
    if (sessions.length === 0) return { avg: 0, best: 0, count: 0, trend: "flat" as const, chartData: [] as { day: string; score: number }[] };
    const avg = Math.round(sessions.reduce((a, b) => a + b.score, 0) / sessions.length);
    const best = Math.max(...sessions.map((s) => s.score));
    const byDay: Record<string, { score: number; count: number }> = {};
    sessions.forEach((s) => {
      const day = s.created_at.slice(0, 10);
      if (!byDay[day]) byDay[day] = { score: 0, count: 0 };
      byDay[day].score += s.score;
      byDay[day].count += 1;
    });
    const cData = Object.values(byDay).map((d) => ({ day: d.day.slice(5), score: Math.round(d.score / d.count) }));
    let t: "up" | "down" | "flat" = "flat";
    if (cData.length >= 2) {
      const first = cData[0].score;
      const last = cData[cData.length - 1].score;
      if (last - first > 5) t = "up";
      else if (first - last > 5) t = "down";
    }
    return { avg, best, count: sessions.length, trend: t, chartData: cData };
  }

  const spatialTrend = exerciseTrend("memory-room");
  const visualTrend = exerciseTrend("visual-change");

  async function downloadPDF() {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229);
    doc.text("Cogniscan Health Report", 20, 25);
    doc.setDrawColor(200);
    doc.line(20, 30, 190, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text(`Name: ${profile?.full_name ?? "\u2014"}`, 20, 42);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 49);
    doc.text(`Tests completed: ${results.length}`, 20, 56);
    doc.text(`Current streak: ${profile?.current_streak ?? 0} days`, 20, 63);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20);
    doc.text("Cognitive Summary", 20, 78);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Overall Score: ${scores.overall} / 100  (${level.label})`, 20, 88);
    doc.text(`Memory: ${scores.memory}`, 20, 96);
    doc.text(`Pattern Recognition: ${scores.pattern}`, 20, 104);
    doc.text(`Reaction Speed: ${scores.reaction}`, 20, 112);
    doc.text(`Trend: ${trend === "up" ? "Improving" : trend === "down" ? "Declining" : "Stable"}`, 20, 120);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Recent Test History", 20, 138);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let y = 148;
    results.slice(-15).reverse().forEach((r) => {
      doc.text(`${new Date(r.created_at).toLocaleDateString()}  \u00b7  ${r.test_type.padEnd(10)}  \u00b7  ${r.score}/${r.max_score}`, 20, y);
      y += 6;
      if (y > 280) { doc.addPage(); y = 20; }
    });

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("This report is for informational purposes only and is not medical advice.", 20, 290);
    doc.save(`cogniscan-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    toast.success("Report downloaded");
  }

  async function deleteAllData() {
    if (!user) return;
    await api.tests.deleteAll();
    await api.exercises.deleteAll();
    await api.chat.deleteAll();
    await load();
    await refreshProfile();
    toast.success("All your data has been deleted");
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Insights & Trends</h1>
          <p className="text-muted-foreground mt-1">Your cognitive journey over time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadPDF} disabled={results.length === 0} className="rounded-xl">
            <Download className="h-4 w-4 mr-2" /> PDF Report
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive rounded-xl">
                <Trash2 className="h-4 w-4 mr-2" /> Delete data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all your data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes all test results, exercises, chat history, and resets your streak. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAllData} className="bg-destructive hover:bg-destructive/90">Delete everything</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>

      {loading ? null : results.length === 0 ? (
        <motion.div variants={item} className="bg-card border border-border rounded-[20px] p-10 text-center shadow-soft">
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Brain className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No data yet. Take a test to start tracking your cognitive baseline.</p>
        </motion.div>
      ) : (
        <>
          <motion.div variants={item} className="grid lg:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Overall Cognitive Level</p>
              <p className={`text-4xl font-bold mt-2 ${level.color}`}>{level.label}</p>
              <p className="text-sm text-muted-foreground mt-1">Score: {scores.overall}/100</p>
            </div>
            <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Trend</p>
              <p className="text-3xl font-bold mt-2 flex items-center gap-2">
                {trend === "up" && <><TrendingUp className="text-green-600" /> <span className="text-green-600">Improving</span></>}
                {trend === "down" && <><TrendingDown className="text-destructive" /> <span className="text-destructive">Declining</span></>}
                {trend === "flat" && <><Minus className="text-muted-foreground" /> <span className="text-muted-foreground">Stable</span></>}
              </p>
            </div>
            <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Longest Streak</p>
              <p className="text-4xl font-bold mt-2 text-amber-500">{profile?.longest_streak ?? 0}</p>
              <p className="text-sm text-muted-foreground mt-1">days</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
            <h2 className="text-xl font-semibold mb-4">Daily Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                  <Line type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: "#4F46E5" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {spatialTrend.count > 0 && (
            <motion.div variants={item} className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-500" /> Spatial Memory Trend
                </h2>
                <div className="flex items-center gap-1 text-sm">
                  {spatialTrend.trend === "up" && <><TrendingUp className="h-4 w-4 text-green-600" /><span className="text-green-600">Improving</span></>}
                  {spatialTrend.trend === "down" && <><TrendingDown className="h-4 w-4 text-destructive" /><span className="text-destructive">Declining</span></>}
                  {spatialTrend.trend === "flat" && <><Minus className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Stable</span></>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-xs text-indigo-600">Average</p>
                  <p className="text-lg font-bold text-indigo-700">{spatialTrend.avg}</p>
                </div>
                <div className="p-2 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-xs text-green-600">Best</p>
                  <p className="text-lg font-bold text-green-700">{spatialTrend.best}</p>
                </div>
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-600">Sessions</p>
                  <p className="text-lg font-bold text-blue-700">{spatialTrend.count}</p>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spatialTrend.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                    <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: "#6366F1" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {visualTrend.count > 0 && (
            <motion.div variants={item} className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Eye className="h-5 w-5 text-teal-500" /> Visual Attention Trend
                </h2>
                <div className="flex items-center gap-1 text-sm">
                  {visualTrend.trend === "up" && <><TrendingUp className="h-4 w-4 text-green-600" /><span className="text-green-600">Improving</span></>}
                  {visualTrend.trend === "down" && <><TrendingDown className="h-4 w-4 text-destructive" /><span className="text-destructive">Declining</span></>}
                  {visualTrend.trend === "flat" && <><Minus className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Stable</span></>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                  <p className="text-xs text-teal-600">Average</p>
                  <p className="text-lg font-bold text-teal-700">{visualTrend.avg}</p>
                </div>
                <div className="p-2 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-xs text-green-600">Best</p>
                  <p className="text-lg font-bold text-green-700">{visualTrend.best}</p>
                </div>
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-600">Sessions</p>
                  <p className="text-lg font-bold text-blue-700">{visualTrend.count}</p>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visualTrend.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                    <Line type="monotone" dataKey="score" stroke="#14B8A6" strokeWidth={3} dot={{ r: 4, fill: "#14B8A6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          <motion.div variants={item} className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
            <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
            <ul className="space-y-3 text-sm">
              {scores.memory < 70 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="h-6 w-6 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="h-3 w-3 text-blue-600" />
                  </div>
                  Memory could improve — try Memory Cards daily for a week.
                </li>
              )}
              {scores.pattern < 70 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                  <div className="h-6 w-6 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                  Pattern recognition needs work — Sequence Recall builds this skill.
                </li>
              )}
              {scores.reaction < 70 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="h-6 w-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingDown className="h-3 w-3 text-amber-600" />
                  </div>
                  Reaction speed is below baseline — Reaction Tap helps.
                </li>
              )}
              {spatialTrend.count > 0 && spatialTrend.avg < 70 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="h-6 w-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-3 w-3 text-indigo-600" />
                  </div>
                  Spatial memory could improve — try Memory Room daily for a week.
                </li>
              )}
              {visualTrend.count > 0 && visualTrend.avg < 70 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-teal-50 border border-teal-100">
                  <div className="h-6 w-6 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="h-3 w-3 text-teal-600" />
                  </div>
                  Visual attention needs work — Visual Change Detection builds this skill.
                </li>
              )}
              {scores.overall >= 75 && (
                <li className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                  <div className="h-6 w-6 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                  You're performing well — keep daily exercises to maintain.
                </li>
              )}
              <li className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="h-3 w-3 text-primary" />
                </div>
                Consistent daily activity is more effective than occasional long sessions.
              </li>
            </ul>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

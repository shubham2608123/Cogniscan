import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/lib/auth";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Upload, ImagePlus, Trash2, Play, ArrowLeft, Check, X, Clock, Target, BookOpen, BarChart3, Sparkles } from "lucide-react";
import {
  type MemoryVaultEntry,
  type MemoryQuestion,
  type MemoryResult,
  uploadMemoryImage,
  saveMemoryWithQuestions,
  fetchMemories,
  fetchRandomQuestions,
  saveMemoryResult,
  deleteMemory,
  getMemoryStats,
} from "@/lib/memory-vault";
import { toast } from "sonner";

export const Route = createFileRoute("/memory-vault")({
  component: () => <AuthGate><MemoryVaultPage /></AuthGate>,
});

type Tab = "library" | "upload" | "test" | "analytics";

const CATEGORIES = [
  { value: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { value: "friends", label: "Friends", emoji: "🤝" },
  { value: "pets", label: "Pets", emoji: "🐾" },
  { value: "travel", label: "Travel", emoji: "✈️" },
  { value: "school", label: "School", emoji: "📚" },
  { value: "birthday", label: "Birthday", emoji: "🎂" },
  { value: "event", label: "Event", emoji: "🎉" },
  { value: "other", label: "Other", emoji: "📌" },
];

function MemoryVaultPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("library");
  const [memories, setMemories] = useState<MemoryVaultEntry[]>([]);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getMemoryStats>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  async function load() {
    if (!user) return;
    setLoading(true);
    const [m, s] = await Promise.all([
      fetchMemories(user.id),
      getMemoryStats(user.id),
    ]);
    setMemories(m);
    setStats(s);
    setLoading(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Memory <span className="gradient-text">Vault</span>
        </h1>
        <p className="text-muted-foreground mt-1">Upload personal memories and train recall with personalized exercises.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        {([
          { id: "library" as Tab, label: "Library", icon: BookOpen },
          { id: "upload" as Tab, label: "Upload", icon: Upload },
          { id: "test" as Tab, label: "Take Test", icon: Play },
          { id: "analytics" as Tab, label: "Analytics", icon: BarChart3 },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "library" && <LibraryTab memories={memories} onDelete={load} loading={loading} />}
      {tab === "upload" && <UploadTab userId={user!.id} onDone={() => { load(); setTab("library"); }} />}
      {tab === "test" && <TestTab userId={user!.id} memories={memories} onDone={load} />}
      {tab === "analytics" && <AnalyticsTab stats={stats} loading={loading} />}
    </motion.div>
  );
}

// ===================== LIBRARY TAB =====================
function LibraryTab({ memories, onDelete, loading }: { memories: MemoryVaultEntry[]; onDelete: () => void; loading: boolean }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? memories : memories.filter((m) => m.category === filter);

  if (loading) return <div className="text-center py-10 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
          All ({memories.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = memories.filter((m) => m.category === c.value).length;
          if (count === 0) return null;
          return (
            <button key={c.value} onClick={() => setFilter(c.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === c.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {c.emoji} {c.label} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-[20px] p-10 text-center shadow-soft">
          <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No memories yet. Upload your first memory to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-[20px] overflow-hidden shadow-soft group">
              {m.image_url && (
                <div className="h-40 overflow-hidden bg-muted">
                  <img src={m.image_url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{m.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.description}</p>
                  </div>
                  <button onClick={async () => {
                    try {
                      const id = (m as Record<string, unknown>)._id as string || m.id;
                      await deleteMemory(id);
                      onDelete();
                      toast.success("Deleted");
                    } catch (e: unknown) {
                      toast.error(e instanceof Error ? e.message : "Failed to delete");
                    }
                  }} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all shrink-0 ml-2">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-1 rounded-lg bg-primary/5 text-primary font-medium">{CATEGORIES.find((c) => c.value === m.category)?.emoji} {m.category}</span>
                  {m.date && <span className="text-xs text-muted-foreground">{m.date}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================== UPLOAD TAB =====================
function UploadTab({ userId, onDone }: { userId: string; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("family");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  }

  async function handleSave() {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in title and description");
      return;
    }
    setSaving(true);
    let imageUrl: string | null = null;
    if (file) {
      imageUrl = await uploadMemoryImage(userId, file);
    }
    const result = await saveMemoryWithQuestions(
      userId,
      title.trim(),
      description.trim(),
      imageUrl,
      category,
      date || null
    );
    setSaving(false);
    if (result) {
      toast.success("Memory saved with auto-generated questions!");
      onDone();
    } else {
      toast.error("Failed to save memory");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft space-y-5">
        {/* Image Upload */}
        <div>
          <Label className="text-sm font-medium">Photo</Label>
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            ) : (
              <>
                <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload a photo</p>
                <p className="text-xs text-muted-foreground/70 mt-1">JPG, PNG up to 5MB</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="mem-title" className="text-sm font-medium">Memory Title *</Label>
          <Input id="mem-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Family Picnic at Juhu Beach" className="mt-1.5 rounded-xl" />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="mem-desc" className="text-sm font-medium">Description *</Label>
          <textarea
            id="mem-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this memory in detail. Include people, places, events, and dates. The more detail, the better the questions will be."
            rows={4}
            className="mt-1.5 w-full p-3 rounded-xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">Questions are generated from this description. Be specific!</p>
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {CATEGORIES.map((c) => (
                <button key={c.value} onClick={() => setCategory(c.value)} className={`p-2 rounded-lg text-xs font-medium transition-all text-center ${category === c.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                  {c.emoji}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="mem-date" className="text-sm font-medium">Date (optional)</Label>
            <Input id="mem-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving || !title.trim() || !description.trim()} className="w-full rounded-xl">
          {saving ? "Saving..." : "Save Memory & Generate Questions"}
        </Button>
      </div>
    </div>
  );
}

// ===================== TEST TAB =====================
function TestTab({ userId, memories, onDone }: { userId: string; memories: MemoryVaultEntry[]; onDone: () => void }) {
  const [phase, setPhase] = useState<"select" | "test" | "result">("select");
  const [questions, setQuestions] = useState<MemoryQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string; correct: boolean }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState<MemoryResult | null>(null);

  async function startTest() {
    if (memories.length === 0) {
      toast.error("Upload some memories first!");
      return;
    }
    const qs = await fetchRandomQuestions(userId, 10);
    if (qs.length === 0) {
      toast.error("No questions available. Upload memories first!");
      return;
    }
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setStartTime(Date.now());
    setPhase("test");
  }

  function submitAnswer() {
    if (!selectedAnswer) return;
    const q = questions[currentIdx];
    const correct = selectedAnswer === q.correct_answer;
    const newAnswers = [...answers, { questionId: q.id, answer: selectedAnswer, correct }];
    setAnswers(newAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        finishTest(newAnswers);
      } else {
        setCurrentIdx(currentIdx + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1200);
  }

  function finishTest(allAnswers: { questionId: string; answer: string; correct: boolean }[]) {
    const correct = allAnswers.filter((a) => a.correct).length;
    const total = allAnswers.length;
    const score = Math.round((correct / total) * 100);
    const timeMs = Date.now() - startTime;
    saveMemoryResult(userId, score, total, correct, total - correct, timeMs).then((r) => {
      setResult(r);
      setPhase("result");
      onDone();
    });
  }

  if (memories.length === 0) {
    return (
      <div className="bg-card border border-border rounded-[20px] p-10 text-center shadow-soft">
        <Brain className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Upload some memories first to generate questions for the test.</p>
      </div>
    );
  }

  if (phase === "select") {
    return (
      <div className="bg-card border border-border rounded-[20px] p-8 shadow-soft text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Memory Recall Test</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Test your recall of {memories.length} uploaded memories. Questions are generated from your own descriptions.
        </p>
        <Button onClick={startTest} size="lg" className="px-8 rounded-xl">
          <Play className="h-4 w-4 mr-2" /> Start Test
        </Button>
      </div>
    );
  }

  if (phase === "result" && result) {
    const rating = result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good" : result.score >= 40 ? "Needs Practice" : "Keep Trying";
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-[20px] p-8 shadow-soft text-center">
        <div className="text-6xl font-bold gradient-text mb-2">{result.score}%</div>
        <p className="text-lg font-medium mb-1">{rating}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-600" /> {result.correct_answers} correct</span>
          <span className="flex items-center gap-1.5"><X className="h-4 w-4 text-destructive" /> {result.incorrect_answers} incorrect</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {(result.completion_time / 1000).toFixed(1)}s</span>
        </div>
        <Button onClick={() => setPhase("select")} className="mt-6 rounded-xl">Back to Test</Button>
      </motion.div>
    );
  }

  // Active test
  const q = questions[currentIdx];
  if (!q) return null;
  const isRecall = q.question_type === "recall";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
      </div>

      <div className="bg-card border border-border rounded-[20px] p-6 lg:p-8 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
            q.difficulty === "easy" ? "bg-green-50 text-green-600" : q.difficulty === "medium" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
          }`}>{q.difficulty}</span>
          <span className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground font-medium">{q.question_type.replace("_", " ")}</span>
        </div>

        <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

        {isRecall ? (
          <div>
            <textarea
              value={selectedAnswer || ""}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Type your answer..."
              rows={3}
              className="w-full p-3 rounded-xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              disabled={showResult}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {q.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === q.correct_answer;
              let optClass = "border-border bg-card hover:bg-muted";
              if (showResult && isCorrect) optClass = "border-green-300 bg-green-50";
              else if (showResult && isSelected && !isCorrect) optClass = "border-red-300 bg-red-50";
              else if (isSelected) optClass = "border-primary bg-primary/5";

              return (
                <button key={opt} onClick={() => { if (!showResult) setSelectedAnswer(opt); }} className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition-all ${optClass}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {showResult && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-xl bg-muted text-sm">
            {selectedAnswer === q.correct_answer ? (
              <span className="text-green-600 font-medium">Correct!</span>
            ) : (
              <span>Correct answer: <strong>{q.correct_answer}</strong></span>
            )}
          </motion.div>
        )}

        {!showResult && (
          <Button onClick={submitAnswer} disabled={!selectedAnswer} className="mt-6 rounded-xl w-full">
            Submit Answer
          </Button>
        )}
      </div>
    </div>
  );
}

// ===================== ANALYTICS TAB =====================
function AnalyticsTab({ stats, loading }: { stats: Awaited<ReturnType<typeof getMemoryStats>> | null; loading: boolean }) {
  if (loading) return <div className="text-center py-10 text-muted-foreground">Loading...</div>;
  if (!stats) return null;

  const catLabels: Record<string, string> = { family: "👨‍👩‍👧 Family", friends: "🤝 Friends", pets: "🐾 Pets", travel: "✈️ Travel", school: "📚 School", birthday: "🎂 Birthday", event: "🎉 Event", other: "📌 Other" };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Total Memories" value={`${stats.totalMemories}`} icon={BookOpen} />
        <StatBox label="Tests Taken" value={`${stats.totalTests}`} icon={Target} />
        <StatBox label="Avg Score" value={`${stats.avgScore}%`} icon={Brain} />
        <StatBox label="Weekly Change" value={`${stats.weeklyImprovement > 0 ? "+" : ""}${stats.weeklyImprovement}%`} icon={Sparkles} />
      </div>

      <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
        <h3 className="font-semibold mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(stats.categoryScores).map(([cat, data]) => (
            <div key={cat} className="flex items-center justify-between">
              <span className="text-sm">{catLabels[cat] || cat}</span>
              <span className="text-sm font-medium text-muted-foreground">{data.count} memories</span>
            </div>
          ))}
          {Object.keys(stats.categoryScores).length === 0 && (
            <p className="text-sm text-muted-foreground">No data yet. Upload memories to see breakdown.</p>
          )}
        </div>
      </div>

      {stats.recentResults.length > 0 && (
        <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Recent Test Results</h3>
          <div className="space-y-2">
            {stats.recentResults.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${r.score >= 80 ? "text-green-600" : r.score >= 50 ? "text-amber-600" : "text-destructive"}`}>{r.score}%</span>
                  <span className="text-sm text-muted-foreground">{r.correct_answers}/{r.total_questions} correct</span>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="bg-card border border-border rounded-[20px] p-4 shadow-soft">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

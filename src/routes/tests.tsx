import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useState, useRef } from "react";
import { Brain, Hash, Zap, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { saveTestResult, feedback } from "@/lib/cognitive";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/tests")({
  component: () => <AuthGate><TestsHub /></AuthGate>,
});

type TestType = "memory" | "pattern" | "reaction" | null;

function TestsHub() {
  const [active, setActive] = useState<TestType>(null);

  if (active === "memory") return <MemoryTest onDone={() => setActive(null)} />;
  if (active === "pattern") return <PatternTest onDone={() => setActive(null)} />;
  if (active === "reaction") return <ReactionTest onDone={() => setActive(null)} />;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Cognitive Tests</h1>
        <p className="text-muted-foreground mt-1">Each test takes 1–2 minutes. Results update your baseline.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <TestCard icon={Brain} title="Memory Test" desc="Remember a sequence of words" color="bg-blue-100 text-blue-600" onClick={() => setActive("memory")} />
        <TestCard icon={Hash} title="Pattern Recognition" desc="Find the next number in the sequence" color="bg-green-100 text-green-600" onClick={() => setActive("pattern")} />
        <TestCard icon={Zap} title="Reaction Test" desc="Tap as soon as the screen turns green" color="bg-amber-100 text-amber-600" onClick={() => setActive("reaction")} />
      </div>
    </motion.div>
  );
}

function TestCard({ icon: Icon, title, desc, color, onClick }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; color: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)" }}
      whileTap={{ scale: 0.98 }}
      className="text-left bg-card border border-border rounded-[20px] p-6 shadow-soft transition-all group w-full"
    >
      <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      <div className="mt-4 flex items-center text-primary text-sm font-medium">
        Start test <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
}

const WORDS = ["river","piano","forest","candle","window","ocean","silver","mountain","lemon","letter"];

function MemoryTest({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [phase, setPhase] = useState<"intro" | "show" | "recall" | "result">("intro");
  const [words] = useState(() => [...WORDS].sort(() => Math.random() - 0.5).slice(0, 6));
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(0);

  function begin() {
    setStart(Date.now());
    setPhase("show");
    setTimeout(() => setPhase("recall"), 8000);
  }

  async function submit() {
    const recalled = input.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const matched = recalled.filter((w) => words.includes(w)).length;
    const sc = Math.round((matched / words.length) * 100);
    setScore(sc);
    setPhase("result");
    if (user) {
      await saveTestResult(user.id, "memory", sc, 100, Date.now() - start, { words, recalled });
      await refreshProfile();
      toast.success("Test saved");
    }
  }

  return (
    <TestShell title="Memory Test" onExit={onDone}>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="h-16 w-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <Brain className="h-8 w-8" />
            </div>
            <p className="text-lg mb-6 text-center text-muted-foreground max-w-md">You will see 6 words for 8 seconds. Remember as many as you can.</p>
            <Button size="lg" onClick={begin} className="px-8 rounded-xl shadow-glow hover:shadow-lg transition-all">Start</Button>
          </motion.div>
        )}
        {phase === "show" && (
          <motion.div key="show" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="grid grid-cols-3 gap-3">
              {words.map((w) => (
                <motion.div key={w} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.random() * 0.3 }}
                  className="px-5 py-3 bg-primary/5 text-primary font-semibold rounded-xl text-lg border border-primary/10">
                  {w}
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground mt-6 text-sm">Memorizing...</p>
          </motion.div>
        )}
        {phase === "recall" && (
          <motion.div key="recall" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="mb-4 text-center text-muted-foreground">Type the words you remember (separated by spaces or commas)</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full max-w-md h-32 p-4 rounded-xl border border-border bg-card text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g. river piano forest"
              autoFocus
            />
            <Button size="lg" className="mt-4 px-8 rounded-xl shadow-glow hover:shadow-lg transition-all" onClick={submit}>Submit</Button>
          </motion.div>
        )}
        {phase === "result" && <ResultView score={score} type="memory" onDone={onDone} />}
      </AnimatePresence>
    </TestShell>
  );
}

function PatternTest({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [puzzles] = useState(() => generatePatterns(5));
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [start] = useState(Date.now());
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  async function answer(choice: number) {
    if (choice === puzzles[idx].answer) setCorrect((c) => c + 1);
    if (idx + 1 >= puzzles.length) {
      const sc = Math.round(((correct + (choice === puzzles[idx].answer ? 1 : 0)) / puzzles.length) * 100);
      setScore(sc);
      setDone(true);
      if (user) {
        await saveTestResult(user.id, "pattern", sc, 100, Date.now() - start);
        await refreshProfile();
        toast.success("Test saved");
      }
    } else setIdx(idx + 1);
  }

  return (
    <TestShell title="Pattern Recognition" onExit={onDone}>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-sm text-muted-foreground mb-4">Question {idx + 1} of {puzzles.length}</p>
            <div className="flex gap-3 mb-8 text-3xl font-bold">
              {puzzles[idx].seq.map((n, i) => <span key={i} className="px-4 py-2 bg-primary/5 text-primary rounded-xl border border-primary/10">{n}</span>)}
              <span className="px-4 py-2 bg-muted rounded-xl text-muted-foreground">?</span>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {puzzles[idx].options.map((opt) => (
                <motion.button key={opt} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="h-14 text-xl font-semibold rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/20 transition-all"
                  onClick={() => answer(opt)}>
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <ResultView score={score} type="pattern" onDone={onDone} />
        )}
      </AnimatePresence>
    </TestShell>
  );
}

function generatePatterns(n: number) {
  const out: { seq: number[]; answer: number; options: number[] }[] = [];
  for (let i = 0; i < n; i++) {
    const start = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 4) + 2;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const answer = start + step * 4;
    const distractors = new Set<number>([answer]);
    while (distractors.size < 4) distractors.add(answer + (Math.floor(Math.random() * 9) - 4));
    out.push({ seq, answer, options: [...distractors].sort(() => Math.random() - 0.5) });
  }
  return out;
}

function ReactionTest({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [phase, setPhase] = useState<"intro" | "wait" | "go" | "result" | "early">("intro");
  const [times, setTimes] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const goAtRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startRound() {
    setPhase("wait");
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = 1500 + Math.random() * 2500;
    timerRef.current = setTimeout(() => {
      goAtRef.current = Date.now();
      setPhase("go");
    }, delay);
  }

  function tap() {
    if (phase === "wait") {
      setPhase("early");
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (phase === "go") {
      const reaction = Date.now() - goAtRef.current;
      const next = [...times, reaction];
      if (next.length >= 5) {
        const avg = next.reduce((a, b) => a + b, 0) / next.length;
        // 150ms=100, 350ms=80, 500ms=55, 700ms=25, 900ms+=0
        const sc = Math.max(0, Math.min(100, Math.round(((900 - avg) / 750) * 100)));
        setScore(sc);
        setPhase("result");
        if (user) {
          saveTestResult(user.id, "reaction", sc, 100, Math.round(avg), { reactions: next }).then(refreshProfile);
          toast.success("Test saved");
        }
      } else {
        setTimes(next);
        setRound(round + 1);
        startRound();
      }
    }
  }

  return (
    <TestShell title="Reaction Test" onExit={onDone}>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <Zap className="h-8 w-8" />
            </div>
            <p className="text-lg text-center mb-6 max-w-md text-muted-foreground">When the screen turns <span className="text-green-600 font-semibold">green</span>, tap as fast as you can. 5 rounds.</p>
            <Button size="lg" onClick={startRound} className="px-8 rounded-xl shadow-glow hover:shadow-lg transition-all">Start</Button>
          </motion.div>
        )}
        {(phase === "wait" || phase === "go") && (
          <motion.button
            key={phase}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={tap}
            className={`w-full h-[60vh] rounded-2xl flex flex-col items-center justify-center text-2xl font-bold transition-colors ${
              phase === "go"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-amber-400 text-white shadow-lg"
            }`}
          >
            {phase === "go" ? (
              <>
                <Zap className="h-12 w-12 mb-3" />
                TAP NOW!
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin mb-3" />
                Wait... (Round {round + 1}/5)
              </>
            )}
          </motion.button>
        )}
        {phase === "early" && (
          <motion.div key="early" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-destructive font-semibold mb-4 text-lg">Too early! Wait for green.</p>
            <Button onClick={() => { setPhase("intro"); setTimes([]); setRound(0); }}>Try Again</Button>
          </motion.div>
        )}
        {phase === "result" && <ResultView score={score} type="reaction" onDone={onDone} times={times} />}
      </AnimatePresence>
    </TestShell>
  );
}

function TestShell({ title, onExit, children }: { title: string; onExit: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="p-2 rounded-xl bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        <Button variant="ghost" onClick={onExit}>Exit</Button>
      </div>
      <div className="bg-card border border-border rounded-[20px] p-6 lg:p-10 shadow-soft min-h-[60vh]">{children}</div>
    </div>
  );
}

function ResultView({ score, type, onDone, times }: { score: number; type: string; onDone: () => void; times?: number[] }) {
  const avg = times && times.length > 0 ? Math.round(times.reduce((a,b)=>a+b,0)/times.length) : null;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-7xl font-bold gradient-text mb-2">{score}</div>
      <p className="text-sm text-muted-foreground mb-1">out of 100 {avg !== null && `· Avg ${avg}ms`}</p>
      {times && times.length > 0 && (
        <div className="flex gap-2 mt-3 mb-4">
          {times.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-lg bg-muted font-medium">R{i+1}: {t}ms</span>
          ))}
        </div>
      )}
      <p className="max-w-md text-center mt-2 text-foreground/80">{feedback(score, type)}</p>
      <div className="flex gap-3 mt-8">
        <Button onClick={onDone} className="rounded-xl shadow-glow hover:shadow-lg transition-all">Back to tests</Button>
      </div>
    </motion.div>
  );
}

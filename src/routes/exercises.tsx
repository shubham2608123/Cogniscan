import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { saveExercise } from "@/lib/cognitive";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, RotateCcw, Trophy, Target, Timer, Star, Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/exercises")({
  component: () => <AuthGate><Exercises /></AuthGate>,
});

type Game = "memory-cards" | "sequence" | "reaction-tap" | "number-puzzle" | "pattern-match" | null;

function Exercises() {
  const [active, setActive] = useState<Game>(null);

  if (active === "memory-cards") return <MemoryCards onDone={() => setActive(null)} />;
  if (active === "sequence") return <SequenceRecall onDone={() => setActive(null)} />;
  if (active === "reaction-tap") return <ReactionTap onDone={() => setActive(null)} />;
  if (active === "number-puzzle") return <NumberPuzzle onDone={() => setActive(null)} />;
  if (active === "pattern-match") return <PatternMatch onDone={() => setActive(null)} />;

  const games = [
    { id: "memory-cards" as const, title: "Memory Cards", desc: "Match all the pairs", emoji: "🧩", bg: "bg-blue-50 border-blue-100" },
    { id: "sequence" as const, title: "Sequence Recall", desc: "Repeat the color pattern", emoji: "🎨", bg: "bg-green-50 border-green-100" },
    { id: "reaction-tap" as const, title: "Reaction Tap", desc: "Hit moving targets fast", emoji: "⚡", bg: "bg-amber-50 border-amber-100" },
    { id: "number-puzzle" as const, title: "Number Puzzle", desc: "Solve quick math chains", emoji: "🔢", bg: "bg-purple-50 border-purple-100" },
    { id: "pattern-match" as const, title: "Pattern Match", desc: "Find the odd one out", emoji: "🎯", bg: "bg-rose-50 border-rose-100" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Brain Exercises</h1>
        <p className="text-muted-foreground mt-1">Daily play strengthens cognitive areas.</p>
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm flex gap-2">
        <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <span>Personalized recommendation: Try <strong>Memory Cards</strong> today to boost your weakest area.</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g, i) => (
          <motion.button
            key={g.id}
            onClick={() => setActive(g.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            className={`text-left ${g.bg} border rounded-[20px] p-5 shadow-soft transition-all`}
          >
            <div className="text-4xl mb-3">{g.emoji}</div>
            <h3 className="font-semibold">{g.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{g.desc}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function GameShell({ title, onExit, children }: { title: string; onExit: () => void; children: React.ReactNode }) {
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
      <div className="bg-card border border-border rounded-[20px] p-6 shadow-soft min-h-[60vh]">{children}</div>
    </div>
  );
}

async function logGame(userId: string | undefined, type: string, score: number, ms: number) {
  if (!userId) return;
  await saveExercise(userId, type, score, ms);
  toast.success("Exercise saved");
}

function MemoryCards({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const emojis = ["🍎","🌟","🎵","🌸","🚀","🐢"];
  const [cards, setCards] = useState(() =>
    [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
  );
  const [picks, setPicks] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [start] = useState(Date.now());
  const won = cards.every((c) => c.matched);

  useEffect(() => {
    if (won) {
      const ms = Date.now() - start;
      const score = Math.max(20, Math.min(100, Math.round(100 - (moves - 6) * 4)));
      logGame(user?.id, "memory-cards", score, ms).then(refreshProfile);
    }
  }, [won]); // eslint-disable-line

  function flip(i: number) {
    if (picks.length === 2 || cards[i].flipped) return;
    const next = cards.map((c, idx) => (idx === i ? { ...c, flipped: true } : c));
    setCards(next);
    const newPicks = [...picks, i];
    setPicks(newPicks);
    if (newPicks.length === 2) {
      setMoves((m) => m + 1);
      setTimeout(() => {
        setCards((curr) => {
          const [a, b] = newPicks;
          if (curr[a].emoji === curr[b].emoji) {
            return curr.map((c, idx) => (idx === a || idx === b ? { ...c, matched: true } : c));
          }
          return curr.map((c, idx) => (idx === a || idx === b ? { ...c, flipped: false } : c));
        });
        setPicks([]);
      }, 700);
    }
  }

  return (
    <GameShell title="Memory Cards" onExit={onDone}>
      <p className="text-sm text-muted-foreground mb-4 text-center">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => flip(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all ${
              c.flipped || c.matched ? "bg-primary/5 border border-primary/10" : "bg-muted hover:bg-accent border border-border"
            } ${c.matched ? "opacity-50" : ""}`}
          >
            {c.flipped || c.matched ? c.emoji : "?"}
          </motion.button>
        ))}
      </div>
      {won && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6">
          <p className="text-green-600 font-semibold text-lg">Completed in {moves} moves!</p>
          <Button className="mt-3" onClick={onDone}>Done</Button>
        </motion.div>
      )}
    </GameShell>
  );
}

function SequenceRecall({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const colors = ["bg-primary","bg-success","bg-warning","bg-destructive"];
  const [seq, setSeq] = useState<number[]>([]);
  const [input, setInput] = useState<number[]>([]);
  const [showing, setShowing] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [level, setLevel] = useState(0);
  const [start] = useState(Date.now());
  const [over, setOver] = useState(false);

  function next() {
    const newSeq = [...seq, Math.floor(Math.random() * 4)];
    setSeq(newSeq);
    setInput([]);
    setLevel(newSeq.length);
    play(newSeq);
  }

  function play(s: number[]) {
    setShowing(true);
    s.forEach((c, i) => {
      setTimeout(() => setActive(c), i * 700);
      setTimeout(() => setActive(null), i * 700 + 400);
    });
    setTimeout(() => setShowing(false), s.length * 700);
  }

  function tap(c: number) {
    if (showing || over) return;
    const ni = [...input, c];
    if (seq[ni.length - 1] !== c) {
      setOver(true);
      const score = Math.min(100, level * 10);
      logGame(user?.id, "sequence", score, Date.now() - start).then(refreshProfile);
      return;
    }
    setInput(ni);
    if (ni.length === seq.length) setTimeout(next, 600);
  }

  return (
    <GameShell title="Sequence Recall" onExit={onDone}>
      <p className="text-center text-sm text-muted-foreground mb-4">Level: {level}</p>
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {colors.map((c, i) => (
          <motion.button
            key={i}
            onClick={() => tap(i)}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-2xl ${c} transition-opacity ${active === i ? "opacity-100" : "opacity-40"}`}
          />
        ))}
      </div>
      <div className="text-center mt-6">
        {seq.length === 0 && <Button onClick={next}>Start</Button>}
        {over && (
          <>
            <p className="text-destructive font-semibold mb-3">Game over! Reached level {level}.</p>
            <Button onClick={onDone}>Done</Button>
          </>
        )}
      </div>
    </GameShell>
  );
}

function ReactionTap({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hits, setHits] = useState(0);
  const [time, setTime] = useState(20);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      const score = Math.min(100, hits * 5);
      logGame(user?.id, "reaction-tap", score, 20000).then(refreshProfile);
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, running]); // eslint-disable-line

  function hit() {
    setHits((h) => h + 1);
    setPos({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 70 });
  }

  return (
    <GameShell title="Reaction Tap" onExit={onDone}>
      <div className="flex justify-between mb-3 text-sm font-medium">
        <span>Hits: {hits}</span>
        <span>Time: {time}s</span>
      </div>
      {!running && time === 20 && (
        <div className="text-center flex flex-col items-center justify-center min-h-[40vh]">
          <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <p className="text-muted-foreground mb-4">Hit the moving targets as fast as you can!</p>
          <Button onClick={() => setRunning(true)} className="px-8 rounded-xl shadow-glow hover:shadow-lg transition-all">Start (20s)</Button>
        </div>
      )}
      {running && (
        <div className="relative w-full h-[55vh] bg-muted rounded-xl overflow-hidden">
          <motion.button
            onClick={hit}
            animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute h-14 w-14 rounded-full bg-primary shadow-glow hover:scale-110 transition-transform"
          />
        </div>
      )}
      {!running && time === 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-4">
          <p className="text-green-600 font-semibold">Done! {hits} hits.</p>
          <Button className="mt-3" onClick={onDone}>Done</Button>
        </motion.div>
      )}
    </GameShell>
  );
}

function NumberPuzzle({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [q, setQ] = useState(() => makeQ());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [start] = useState(Date.now());
  const [done, setDone] = useState(false);

  function makeQ() {
    const a = Math.floor(Math.random() * 30) + 5;
    const b = Math.floor(Math.random() * 20) + 2;
    const ops = ["+", "-", "\u00d7"] as const;
    const op = ops[Math.floor(Math.random() * 3)];
    const result = op === "+" ? a + b : op === "-" ? a - b : a * b;
    return { text: `${a} ${op} ${b}`, result };
  }

  function submit() {
    if (parseInt(answer) === q.result) setScore((s) => s + 10);
    if (round + 1 >= 10) {
      setDone(true);
      logGame(user?.id, "number-puzzle", score + (parseInt(answer) === q.result ? 10 : 0), Date.now() - start).then(refreshProfile);
    } else {
      setRound(round + 1);
      setQ(makeQ());
      setAnswer("");
    }
  }

  return (
    <GameShell title="Number Puzzle" onExit={onDone}>
      {!done ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-sm text-muted-foreground mb-2">Question {round + 1}/10 · Score {score}</p>
          <div className="text-5xl font-bold mb-6">{q.text} = ?</div>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            autoFocus
            className="w-32 h-14 text-center text-2xl rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button className="mt-4" onClick={submit}>Submit</Button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="text-4xl font-bold gradient-text mb-2">Score: {score}/100</p>
          <Button className="mt-4" onClick={onDone}>Done</Button>
        </motion.div>
      )}
    </GameShell>
  );
}

function PatternMatch({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [start] = useState(Date.now());
  const [done, setDone] = useState(false);
  const total = 8;
  const [puzzle, setPuzzle] = useState(() => mkPuzzle());

  function mkPuzzle() {
    const main = "\uD83D\uDD35";
    const odd = "\uD83D\uDFE2";
    const size = 16;
    const oddIdx = Math.floor(Math.random() * size);
    return Array.from({ length: size }, (_, i) => (i === oddIdx ? odd : main));
  }

  function pick(i: number) {
    if (puzzle[i] === "\uD83D\uDFE2") setScore((s) => s + Math.round(100 / total));
    if (round + 1 >= total) {
      setDone(true);
      logGame(user?.id, "pattern-match", score + (puzzle[i] === "\uD83D\uDFE2" ? Math.round(100 / total) : 0), Date.now() - start).then(refreshProfile);
    } else {
      setRound(round + 1);
      setPuzzle(mkPuzzle());
    }
  }

  return (
    <GameShell title="Pattern Match" onExit={onDone}>
      {!done ? (
        <>
          <p className="text-center text-sm text-muted-foreground mb-4">Find the green one · {round + 1}/{total}</p>
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
            {puzzle.map((c, i) => (
              <motion.button key={i} onClick={() => pick(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="aspect-square text-4xl bg-muted hover:bg-accent rounded-xl border border-border transition-all">
                {c}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="text-4xl font-bold gradient-text mb-2">Score: {score}</p>
          <Button className="mt-4" onClick={onDone}>Done</Button>
        </motion.div>
      )}
    </GameShell>
  );
}

import { api } from "@/lib/api";

export type TestResult = {
  id: string;
  test_type: "memory" | "pattern" | "reaction";
  score: number;
  max_score: number;
  duration_ms: number | null;
  created_at: string;
};

export function levelFromScore(score: number): { label: "High" | "Medium" | "Low"; color: string } {
  if (score >= 75) return { label: "High", color: "text-success" };
  if (score >= 50) return { label: "Medium", color: "text-warning" };
  return { label: "Low", color: "text-destructive" };
}

export function feedback(score: number, type: string): string {
  if (score >= 85) return `Excellent ${type} performance! Keep up your daily exercises to maintain this level.`;
  if (score >= 70) return `You're doing well on ${type}. A few daily brain exercises will help you improve further.`;
  if (score >= 50) return `Your ${type} score suggests room for improvement. Regular practice can strengthen this area.`;
  return `We noticed your ${type} score is on the lower side. Daily exercises and consistent activity can help significantly.`;
}

export async function saveTestResult(
  userId: string,
  test_type: "memory" | "pattern" | "reaction",
  score: number,
  max_score: number,
  duration_ms?: number,
  details?: Record<string, unknown>
) {
  await api.tests.save({ test_type, score, max_score, duration_ms: duration_ms ?? 0, details });
}

export async function saveExercise(userId: string, exercise_type: string, score: number, duration_ms?: number) {
  await api.exercises.save({ exercise_type, score, duration_ms: duration_ms ?? 0 });
}

export function aggregateScores(results: TestResult[]) {
  if (results.length === 0) return { overall: 0, memory: 0, pattern: 0, reaction: 0 };
  const norm = (r: TestResult) => (r.score / r.max_score) * 100;
  const byType = (t: string) => {
    const arr = results.filter((r) => r.test_type === t).map(norm);
    return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  };
  const all = results.map(norm);
  return {
    overall: Math.round(all.reduce((a, b) => a + b, 0) / all.length),
    memory: byType("memory"),
    pattern: byType("pattern"),
    reaction: byType("reaction"),
  };
}

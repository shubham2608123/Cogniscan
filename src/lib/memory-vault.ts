import { api } from "@/lib/api";

export type MemoryVaultEntry = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  date: string | null;
  created_at: string;
};

export type MemoryQuestion = {
  id: string;
  memory_id: string;
  user_id: string;
  question: string;
  options: string[];
  correct_answer: string;
  question_type: "mcq" | "true_false" | "recall";
  difficulty: "easy" | "medium" | "hard";
  created_at: string;
};

export type MemoryResult = {
  id: string;
  user_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  completion_time: number;
  created_at: string;
};

// Simple client-side question generator from description
export function generateQuestionsFromDescription(
  description: string,
  title: string
): Omit<MemoryQuestion, "id" | "memory_id" | "user_id" | "created_at">[] {
  const questions: Omit<MemoryQuestion, "id" | "memory_id" | "user_id" | "created_at">[] = [];
  const sentences = description.split(/[.!?]+/).filter((s) => s.trim().length > 3);

  const words = description.split(/\s+/);
  const properNouns: string[] = [];
  for (const word of words) {
    const clean = word.replace(/[^a-zA-Z]/g, "");
    if (clean.length > 1 && clean[0] === clean[0].toUpperCase() && clean[0] !== clean[0].toLowerCase()) {
      properNouns.push(clean);
    }
  }
  const uniqueNouns = [...new Set(properNouns)];

  const yearMatches = description.match(/\b(19|20)\d{2}\b/g) || [];
  const uniqueYears = [...new Set(yearMatches)];

  const locationPatterns = description.match(/\b(at|in|on|to|from)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g) || [];
  const locations = locationPatterns.map((l) => l.replace(/^(at|in|on|to|from)\s+/i, "").trim());

  questions.push({
    question: `What is the title of this memory?`,
    options: shuffle([title, "Unknown", "My Memory", "Photo Upload"]),
    correct_answer: title,
    question_type: "mcq",
    difficulty: "easy",
  });

  if (sentences.length > 0) {
    const keySentence = sentences[0].trim();
    const truncated = keySentence.length > 60 ? keySentence.slice(0, 57) + "..." : keySentence;
    questions.push({
      question: `This memory is about: "${truncated}" — What is the main topic?`,
      options: shuffle([title, "Unknown", "General", "Other"]),
      correct_answer: title,
      question_type: "mcq",
      difficulty: "easy",
    });
  }

  if (uniqueNouns.length >= 2) {
    const people = uniqueNouns.slice(0, 4);
    questions.push({
      question: `Who is mentioned in this memory?`,
      options: shuffle([...people.slice(0, 3), "Nobody specific"]),
      correct_answer: people[0],
      question_type: "mcq",
      difficulty: "medium",
    });
  }

  if (locations.length > 0) {
    const loc = locations[0];
    questions.push({
      question: `Where does this memory take place?`,
      options: shuffle([loc, "Unknown", "Home", "School"]),
      correct_answer: loc,
      question_type: "mcq",
      difficulty: "medium",
    });
  }

  if (uniqueYears.length > 0) {
    const yr = uniqueYears[0];
    questions.push({
      question: `When did this memory happen?`,
      options: shuffle([yr, String(Number(yr) - 1), String(Number(yr) + 1), "Unknown"]),
      correct_answer: yr,
      question_type: "mcq",
      difficulty: "hard",
    });
  } else {
    questions.push({
      question: `This memory is titled "${title}". Is that correct?`,
      options: shuffle(["True", "False"]),
      correct_answer: "True",
      question_type: "true_false",
      difficulty: "easy",
    });
  }

  questions.push({
    question: `What category best describes this memory?`,
    options: shuffle(["family", "friends", "travel", "event"]),
    correct_answer: "family",
    question_type: "mcq",
    difficulty: "easy",
  });

  if (sentences.length > 0) {
    const fullDesc = description.trim();
    const recallTruncated = fullDesc.length > 100 ? fullDesc.slice(0, 97) + "..." : fullDesc;
    questions.push({
      question: `Describe this memory in your own words. (Hint: it starts with "${recallTruncated}")`,
      options: [],
      correct_answer: description.trim(),
      question_type: "recall",
      difficulty: "hard",
    });
  }

  while (questions.length < 5) {
    questions.push({
      question: `Is the title "${title}" accurate for this memory?`,
      options: shuffle(["Yes", "No"]),
      correct_answer: "Yes",
      question_type: "true_false",
      difficulty: "easy",
    });
  }

  return questions.slice(0, 8);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Upload image via API
export async function uploadMemoryImage(userId: string, file: File): Promise<string | null> {
  return api.memoryVault.uploadImage(file);
}

// Save memory and generate questions
export async function saveMemoryWithQuestions(
  userId: string,
  title: string,
  description: string,
  imageUrl: string | null,
  category: string,
  date: string | null
): Promise<MemoryVaultEntry | null> {
  const qs = generateQuestionsFromDescription(description, title);
  const result = await api.memoryVault.saveMemory({
    title,
    description,
    image_url: imageUrl,
    category,
    date,
    questions: qs,
  });
  return result as unknown as MemoryVaultEntry;
}

// Fetch all memories for user
export async function fetchMemories(userId: string): Promise<MemoryVaultEntry[]> {
  const data = await api.memoryVault.getMemories();
  return data as unknown as MemoryVaultEntry[];
}

// Fetch questions for user
export async function fetchQuestions(userId: string): Promise<MemoryQuestion[]> {
  const data = await api.memoryVault.getQuestions();
  return data as unknown as MemoryQuestion[];
}

// Fetch random questions for a test
export async function fetchRandomQuestions(userId: string, count: number = 10): Promise<MemoryQuestion[]> {
  const data = await api.memoryVault.getRandomQuestions(count);
  return data as unknown as MemoryQuestion[];
}

// Save test result
export async function saveMemoryResult(
  userId: string,
  score: number,
  total: number,
  correct: number,
  incorrect: number,
  timeMs: number
): Promise<MemoryResult | null> {
  const data = await api.memoryVault.saveResult({
    score,
    total_questions: total,
    correct_answers: correct,
    incorrect_answers: incorrect,
    completion_time: timeMs,
  });
  return data as unknown as MemoryResult;
}

// Fetch all results for user
export async function fetchMemoryResults(userId: string): Promise<MemoryResult[]> {
  const data = await api.memoryVault.getResults();
  return data as unknown as MemoryResult[];
}

// Delete a memory and its questions
export async function deleteMemory(memoryId: string): Promise<void> {
  await api.memoryVault.deleteMemory(memoryId);
}

// Get memory stats for dashboard
export async function getMemoryStats(userId: string) {
  const [memories, results] = await Promise.all([
    fetchMemories(userId),
    fetchMemoryResults(userId),
  ]);

  const totalMemories = memories.length;
  const totalTests = results.length;
  const avgScore =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
      : 0;

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
  const thisWeek = results.filter(
    (r) => new Date(r.created_at).getTime() > weekAgo
  );
  const lastWeek = results.filter(
    (r) =>
      new Date(r.created_at).getTime() > twoWeeksAgo &&
      new Date(r.created_at).getTime() <= weekAgo
  );
  const thisWeekAvg =
    thisWeek.length > 0
      ? thisWeek.reduce((s, r) => s + r.score, 0) / thisWeek.length
      : 0;
  const lastWeekAvg =
    lastWeek.length > 0
      ? lastWeek.reduce((s, r) => s + r.score, 0) / lastWeek.length
      : 0;
  const weeklyImprovement = Math.round(thisWeekAvg - lastWeekAvg);

  const categoryScores: Record<string, { total: number; count: number }> = {};
  for (const memory of memories) {
    const cat = memory.category;
    if (!categoryScores[cat]) categoryScores[cat] = { total: 0, count: 0 };
    categoryScores[cat].count++;
  }

  const bestCategory =
    Object.entries(categoryScores).sort((a, b) => b[1].count - a[1].count)[0]
      ?.[0] || "family";

  return {
    totalMemories,
    totalTests,
    avgScore,
    weeklyImprovement,
    bestCategory,
    categoryScores,
    recentResults: results.slice(0, 10),
    allResults: results,
  };
}

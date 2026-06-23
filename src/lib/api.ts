const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cogniscan_token');
}

export function setToken(token: string) {
  localStorage.setItem('cogniscan_token', token);
}

export function clearToken() {
  localStorage.removeItem('cogniscan_token');
}

async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || res.statusText);
  }
  return res.json();
}

// Auth
export const api = {
  auth: {
    signIn: (email: string, password: string) =>
      request<{ token: string; user: { id: string; email: string; full_name: string; role: string } }>('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    signUp: (email: string, password: string, full_name: string, role: string) =>
      request<{ token: string; user: { id: string; email: string; full_name: string; role: string } }>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, full_name, role }),
      }),
    getProfile: () => request<Record<string, unknown>>('/api/auth/profile'),
    verify: () => request<{ valid: boolean; userId: string }>('/api/auth/verify'),
  },

  tests: {
    getAll: () => request<Array<Record<string, unknown>>>('/api/tests'),
    save: (data: { test_type: string; score: number; max_score: number; duration_ms?: number; details?: unknown }) =>
      request('/api/tests', { method: 'POST', body: JSON.stringify(data) }),
    deleteAll: () => request('/api/tests', { method: 'DELETE' }),
  },

  exercises: {
    getAll: () => request<Array<Record<string, unknown>>>('/api/exercises'),
    getCount: () => request<{ count: number }>('/api/exercises/count'),
    save: (data: { exercise_type: string; score: number; duration_ms?: number }) =>
      request('/api/exercises', { method: 'POST', body: JSON.stringify(data) }),
    deleteAll: () => request('/api/exercises', { method: 'DELETE' }),
  },

  chat: {
    getAll: () => request<Array<Record<string, unknown>>>('/api/chat'),
    save: (role: string, content: string) =>
      request('/api/chat', { method: 'POST', body: JSON.stringify({ role, content }) }),
    deleteAll: () => request('/api/chat', { method: 'DELETE' }),
  },

  memoryVault: {
    uploadImage: async (file: File): Promise<string | null> => {
      const token = getToken();
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_URL}/api/memory-vault/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.url ?? null;
    },
    getMemories: () => request<Array<Record<string, unknown>>>('/api/memory-vault/memories'),
    saveMemory: (data: { title: string; description: string; image_url: string | null; category: string; date: string | null; questions: unknown[] }) =>
      request('/api/memory-vault/memories', { method: 'POST', body: JSON.stringify(data) }),
    deleteMemory: (id: string) =>
      request(`/api/memory-vault/memories/${id}`, { method: 'DELETE' }),
    getQuestions: () => request<Array<Record<string, unknown>>>('/api/memory-vault/questions'),
    getRandomQuestions: (count: number = 10) =>
      request<Array<Record<string, unknown>>>(`/api/memory-vault/questions/random?count=${count}`),
    saveResult: (data: { score: number; total_questions: number; correct_answers: number; incorrect_answers: number; completion_time: number }) =>
      request('/api/memory-vault/results', { method: 'POST', body: JSON.stringify(data) }),
    getResults: () => request<Array<Record<string, unknown>>>('/api/memory-vault/results'),
  },
};

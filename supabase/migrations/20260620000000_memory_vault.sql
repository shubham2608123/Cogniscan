-- Memory Vault tables

-- 1. Memory Vault entries
CREATE TABLE public.memory_vault (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'other' CHECK (category IN ('family','friends','pets','travel','school','birthday','event','other')),
  date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.memory_vault ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own vault" ON public.memory_vault FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own vault" ON public.memory_vault FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own vault" ON public.memory_vault FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own vault" ON public.memory_vault FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_memory_vault_user ON public.memory_vault(user_id, created_at DESC);

-- 2. Memory Questions (auto-generated from descriptions)
CREATE TABLE public.memory_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id UUID NOT NULL REFERENCES public.memory_vault(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'mcq' CHECK (question_type IN ('mcq','true_false','recall')),
  difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy','medium','hard')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.memory_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own questions" ON public.memory_questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own questions" ON public.memory_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own questions" ON public.memory_questions FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_memory_questions_user ON public.memory_questions(user_id, created_at DESC);
CREATE INDEX idx_memory_questions_memory ON public.memory_questions(memory_id);

-- 3. Memory Test Results
CREATE TABLE public.memory_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  incorrect_answers INTEGER NOT NULL,
  completion_time INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.memory_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own memory results" ON public.memory_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own memory results" ON public.memory_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own memory results" ON public.memory_results FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_memory_results_user ON public.memory_results(user_id, created_at DESC);

-- 4. Storage bucket for memory images
INSERT INTO storage.buckets (id, name, public) VALUES ('memory-images', 'memory-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload own memory images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'memory-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view memory images" ON storage.objects
  FOR SELECT USING (bucket_id = 'memory-images');

CREATE POLICY "Users delete own memory images" ON storage.objects
  FOR DELETE USING (bucket_id = 'memory-images' AND auth.uid()::text = (storage.foldername(name))[1]);

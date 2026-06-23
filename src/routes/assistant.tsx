import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Send, Brain, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/assistant")({
  component: () => <AuthGate><Assistant /></AuthGate>,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestedPrompts = [
  "How can I improve my memory?",
  "What does my cognitive score mean?",
  "Suggest daily brain exercises",
  "How does the reaction test work?",
];

function Assistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    api.chat.getAll().then((data) => setMessages((data ?? []) as Msg[]));
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(msg?: string) {
    const text = msg || input.trim();
    if (!text || !user || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    await api.chat.save("user", userMsg.content);

    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ""}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMsgs.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
      });

      if (resp.status === 429) { toast.error("Rate limit, try again shortly"); setLoading(false); return; }
      if (!resp.ok || !resp.body) {
        // Fallback: provide a helpful response without API key
        const fallbackResponse = getFallbackResponse(text);
        setMessages((m) => [...m, { role: "assistant", content: fallbackResponse }]);
        await api.chat.save("assistant", fallbackResponse);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistantText = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, content: assistantText } : msg));
            }
          } catch { buf = line + "\n" + buf; break; }
        }
      }

      if (assistantText) {
        await api.chat.save("assistant", assistantText);
      }
    } catch (e) {
      console.error(e);
      // Fallback response on connection error
      const fallbackResponse = getFallbackResponse(text);
      setMessages((m) => {
        const lastIdx = m.length - 1;
        if (m[lastIdx]?.content === "") {
          return m.map((msg, i) => i === lastIdx ? { ...msg, content: fallbackResponse } : msg);
        }
        return [...m, { role: "assistant", content: fallbackResponse }];
      });
      await api.chat.save("assistant", fallbackResponse);
    } finally {
      setLoading(false);
    }
  }

  function getFallbackResponse(question: string): string {
    const q = question.toLowerCase();
    if (q.includes("memory") || q.includes("remember")) {
      return "To improve your memory, try these techniques:\n\n1. **Spaced Repetition**: Review information at increasing intervals\n2. **Active Recall**: Test yourself instead of re-reading\n3. **Memory Palace**: Associate information with locations you know\n4. **Chunking**: Break information into smaller groups\n5. **Regular Exercise**: Physical activity boosts memory function\n\nConsistency is key - even 10 minutes of daily practice helps!";
    }
    if (q.includes("score") || q.includes("cognitive")) {
      return "Your cognitive scores reflect your performance across three key areas:\n\n- **Memory**: Word recall ability (0-100)\n- **Pattern Recognition**: Sequential logic (0-100)\n- **Reaction Speed**: Response time (0-100)\n\nScores above 75 are considered High, 50-74 Medium, and below 50 Low. Regular practice with brain exercises can help improve these scores over time.";
    }
    if (q.includes("exercise") || q.includes("brain")) {
      return "Here are some great daily brain exercises:\n\n1. **Memory Cards** - Builds visual memory and concentration\n2. **Sequence Recall** - Strengthens pattern recognition\n3. **Reaction Tap** - Improves reflexes and focus\n4. **Number Puzzle** - Enhances mathematical thinking\n5. **Pattern Match** - Boosts visual discrimination\n\nI recommend doing at least 2-3 exercises daily for optimal cognitive health. Start with your weakest area!";
    }
    if (q.includes("reaction") || q.includes("test")) {
      return "The Reaction Test measures how quickly you respond to visual stimuli. Here's how it works:\n\n1. Wait for the screen to turn green\n2. Tap as fast as you can\n3. Complete 5 rounds\n4. Your average reaction time determines your score\n\nTypical reaction times:\n- Under 250ms: Excellent\n- 250-350ms: Good\n- 350-500ms: Average\n- Over 500ms: Room for improvement\n\nPractice daily to improve your reaction speed!";
    }
    return "I'm your Cogniscan AI assistant. I can help you with:\n\n- Understanding your cognitive scores\n- Suggesting brain exercises\n- Memory improvement techniques\n- Reaction test tips\n- General brain health advice\n\nFeel free to ask me anything about cognitive health!";
  }

  async function clearChat() {
    if (!user) return;
    await api.chat.deleteAll();
    setMessages([]);
    toast.success("Chat cleared");
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-8rem)] lg:h-[calc(100dvh-5rem)]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask anything about brain health, exercises, or your scores.</p>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-card border border-border rounded-[20px] p-4 lg:p-6 shadow-soft space-y-4">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold text-lg">Hi! I'm your Cogniscan AI assistant.</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">Ask things like "How can I improve my memory?" or "What does my score mean?"</p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-md">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  className="text-xs px-3 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
              m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content || (loading && i === messages.length - 1 ? (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : "")}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your brain health..."
          disabled={loading}
          className="flex-1 h-12 px-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          size="lg"
          className="h-12 px-5 rounded-xl shadow-glow hover:shadow-lg transition-all"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

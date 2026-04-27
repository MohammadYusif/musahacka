"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: number;
}

export function ChatInterface() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hello! I'm your MedVisit assistant for medical tourism in Al-Ahsa. How can I help you today? You can ask about facilities, specialties, treatment packages, or travel arrangements.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");

    const userMsgId = msgIdRef.current++;
    const assistantMsgId = msgIdRef.current++;

    setMessages((prev) => [...prev, { role: "user", content: userMessage, id: userMsgId }]);
    setIsStreaming(true);

    try {
      const chatMessages = [...messages, { role: "user" as const, content: userMessage }]
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let assistantContent = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "", id: assistantMsgId }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  const idx = updated.findIndex((m) => m.id === assistantMsgId);
                  if (idx !== -1) {
                    updated[idx] = { ...updated[idx], content: assistantContent };
                  }
                  return updated;
                });
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch {
      const errId = msgIdRef.current++;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again.", id: errId },
      ]);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const suggestions = [
    "I need a cardiologist in Al-Ahsa",
    "What are the best hospitals for orthopedics?",
    "How much does a cardiac check-up cost?",
    "Help me plan my medical trip to Saudi Arabia",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.role === "user" ? 20 : -20, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                {message.content ? (
                  <span className={isStreaming && message === messages[messages.length - 1] && message.role === "assistant" ? "streaming-cursor" : ""}>
                    {message.content}
                  </span>
                ) : (
                  <span className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {suggestions.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput(s);
                  inputRef.current?.focus();
                }}
              >
                {s}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="flex gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          disabled={isStreaming}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={isStreaming || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </motion.form>
    </div>
  );
}

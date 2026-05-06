"use client";

import { useTranslations } from "next-intl";
import { ChatInterface } from "@/components/chat/chat-interface";
import { FadeIn } from "@/components/ui/fade-in";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const t = useTranslations("chat");

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <FadeIn>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-ivory-100" />
              </div>
              <h1 className="text-2xl font-bold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>{t("title")}</h1>
            </div>
            <p className="text-bark-600">{t("subtitle")}</p>
          </div>
        </FadeIn>
        <ChatInterface />
      </div>
    </div>
  );
}

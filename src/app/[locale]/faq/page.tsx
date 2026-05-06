"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, HelpCircle } from "lucide-react";

export default function FaqPage() {
  const t = useTranslations();
  const tp = useTranslations("pages.faq");

  const faqItems = [
    { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
    { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
    { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
    { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
    { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
    { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
  ];

  return (
    <div className="min-h-screen bg-ivory-100/50">
      <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-600">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <defs><pattern id="faqGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#faqGrid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-7 h-7 text-gold-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-ivory-100" style={{ fontFamily: "var(--font-display)" }}>{tp("title")}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <AccordionPrimitive.Root type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionPrimitive.Item key={index} value={`item-${index}`} className="bg-white rounded-xl border border-ivory-300 mb-3 overflow-hidden">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between px-6 py-4 font-medium transition-all hover:bg-ivory-100 text-left rtl:text-right w-full text-bark-800">
                {item.question}
                <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-200 rtl:rotate-180 [&[data-state=open]>svg]:rotate-90" />
              </AccordionPrimitive.Trigger>
              <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-6 pb-4 pt-0 text-bark-700/70">{item.answer}</div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </div>
  );
}

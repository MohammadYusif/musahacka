"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ArrowRight, Star, Leaf, Shield, Globe, Heart, Activity,
  Stethoscope, DollarSign, Plane, MessageSquare, HeartPulse,
  Calendar, FileText, Building, Users, Zap, CheckCircle,
  ChevronRight, HeartHandshake, Mail, ChevronUp,
} from "lucide-react";
import type { Variants } from "framer-motion";

const featureKeys = [
  { icon: Stethoscope, key: "triage", badge: "Core" },
  { icon: DollarSign, key: "pricing", badge: "Core" },
  { icon: Plane, key: "travel", badge: "Coming Soon" },
  { icon: MessageSquare, key: "chat", badge: "Core" },
  { icon: HeartPulse, key: "followup", badge: "Coming Soon" },
] as const;

const steps = [
  { key: "step1", number: 1, icon: FileText },
  { key: "step2", number: 2, icon: Activity },
  { key: "step3", number: 3, icon: Building },
  { key: "step4", number: 4, icon: Calendar },
] as const;

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const onScroll = () => setBackToTopVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const faqItems = [
    { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
    { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
    { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
    { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
    { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
    { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
  ];

  const testimonialsItems = [
    { name: t("testimonials.items.0.name"), location: t("testimonials.items.0.location"), text: t("testimonials.items.0.text"), treatment: t("testimonials.items.0.treatment") },
    { name: t("testimonials.items.1.name"), location: t("testimonials.items.1.location"), text: t("testimonials.items.1.text"), treatment: t("testimonials.items.1.treatment") },
    { name: t("testimonials.items.2.name"), location: t("testimonials.items.2.location"), text: t("testimonials.items.2.text"), treatment: t("testimonials.items.2.treatment") },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[75vh] flex items-center overflow-hidden">
        {/* ECG Lifeline Animation */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-25">
          <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ecgGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="85%" stopColor="#4A6FA5" stopOpacity="0" />
                <stop offset="90%" stopColor="#C9933A" stopOpacity="0.4" />
                <stop offset="95%" stopColor="#C9933A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <clipPath id="ecgClip"><rect x="0" y="700" width="1440" height="200" /></clipPath>
            </defs>
            <g clipPath="url(#ecgClip)" opacity="0.8">
              <rect x="0" y="700" width="1440" height="200" fill="url(#ecgGlow)" />
              <path d="M0 780 L200 780 L250 780 L270 740 L290 820 L310 780 L500 780 L600 780 L620 750 L640 810 L660 780 L1000 780 L1050 780 L1070 740 L1090 820 L1110 780 L1300 780 L1350 780 L1370 750 L1390 810 L1410 780 L1440 780"
                stroke="#C9933A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="2000" strokeDashoffset="2000">
                <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M0 780 L200 780 L250 780 L270 740 L290 820 L310 780 L500 780 L600 780 L620 750 L640 810 L660 780 L1000 780 L1050 780 L1070 740 L1090 820 L1110 780 L1300 780 L1350 780 L1370 750 L1390 810 L1410 780 L1440 780"
                stroke="#C9933A" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"
                strokeDasharray="2000" strokeDashoffset="2000">
                <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="4s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-600">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 hidden md:block" style={{ background: isRtl ? "linear-gradient(to left, rgba(30,41,59,0.85) 0%, rgba(30,41,59,0.6) 40%, rgba(30,41,59,0.2) 70%, transparent 100%)" : "linear-gradient(to right, rgba(30,41,59,0.85) 0%, rgba(30,41,59,0.6) 40%, rgba(30,41,59,0.2) 70%, transparent 100%)" }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(30,41,59,0.9) 0%, rgba(30,41,59,0.5) 50%, rgba(30,41,59,0.3) 100%)" }} />

        <div className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="120" stroke="#FDFBF7" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="80" stroke="#FDFBF7" strokeWidth="0.8" />
            <circle cx="200" cy="80" r="8" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="200" cy="320" r="8" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="80" cy="200" r="8" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="320" cy="200" r="8" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="115" cy="115" r="6" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="285" cy="115" r="6" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="115" cy="285" r="6" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="285" cy="285" r="6" stroke="#FDFBF7" strokeWidth="1" />
            <circle cx="200" cy="200" r="4" stroke="#FDFBF7" strokeWidth="1" />
            <line x1="200" y1="80" x2="115" y2="115" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="200" y1="80" x2="285" y2="115" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="200" y1="320" x2="115" y2="285" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="200" y1="320" x2="285" y2="285" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="80" y1="200" x2="115" y2="115" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="80" y1="200" x2="115" y2="285" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="320" y1="200" x2="285" y2="115" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="320" y1="200" x2="285" y2="285" stroke="#FDFBF7" strokeWidth="0.8" />
            <line x1="115" y1="115" x2="285" y2="285" stroke="#FDFBF7" strokeWidth="0.5" opacity="0.5" />
            <line x1="285" y1="115" x2="115" y2="285" stroke="#FDFBF7" strokeWidth="0.5" opacity="0.5" />
            <line x1="200" y1="80" x2="200" y2="320" stroke="#FDFBF7" strokeWidth="0.5" opacity="0.4" />
            <line x1="80" y1="200" x2="320" y2="200" stroke="#FDFBF7" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className={isRtl ? "max-w-2xl ml-auto" : "max-w-2xl"}>

            <motion.h1 custom={0.4} variants={fadeInUp} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="text-5xl md:text-6xl lg:text-7xl font-semibold text-ivory-50 leading-none tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-ivory-100 to-gold-400 bg-clip-text text-transparent">{t("hero.titleHighlight")}</span>
            </motion.h1>
            <motion.p custom={0.6} variants={fadeInUp} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="text-ivory-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              {t("hero.subtitle")}
            </motion.p>
            <motion.div custom={0.8} variants={fadeInUp} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="flex flex-wrap gap-4">
              <Link href="/triage">
                <Button className="inline-flex items-center gap-2 bg-brand-600 text-ivory-100 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-brand-700 transition-all active:scale-[0.97] border-0">
                  {t("hero.cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/facilities">
                <Button variant="outline" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-ivory-100 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border border-white/20 hover:bg-white/20 transition-all active:scale-[0.97]">
                  {t("hero.secondary")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
            <path d="M0,80 C360,0 1080,80 1440,0 L1440,80 L0,80 Z" fill="#FDFBF7" />
          </svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="paper-texture py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-40"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-200/20 rounded-full blur-[80px]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <motion.div className="relative" variants={itemVariants}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <div className="w-full aspect-[4/5] bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <pattern id="medGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#medGrid)" />
                    </svg>
                  </div>
                  <svg className="w-56 h-56 text-white/20 relative z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                    <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                    <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M100 80 L100 120 M80 100 L120 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <g opacity="0.6">
                      <line x1="10" y1="100" x2="25" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="175" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="100" y1="10" x2="100" y2="25" stroke="currentColor" strokeWidth="1" />
                      <line x1="100" y1="175" x2="100" y2="190" stroke="currentColor" strokeWidth="1" />
                    </g>
                    <g opacity="0.4">
                      <circle cx="45" cy="45" r="4" fill="currentColor" />
                      <circle cx="155" cy="45" r="4" fill="currentColor" />
                      <circle cx="45" cy="155" r="4" fill="currentColor" />
                      <circle cx="155" cy="155" r="4" fill="currentColor" />
                    </g>
                    <g opacity="0.3">
                      <path d="M30 70 Q50 55 70 70" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      <path d="M130 70 Q150 55 170 70" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </g>
                  </svg>
                  <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                    <p className="text-white/40 text-xs tracking-[0.3em] uppercase">{t("about.subtitle")}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bark-900/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 right-4 md:-right-8 bg-ivory-50 rounded-2xl px-5 py-4 shadow-lg border border-ivory-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold-400" />
                  <p className="text-xs text-bark-700 font-medium">{t("about.badge")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
                <span className="w-6 h-px bg-gold-400"></span>
                {t("about.subtitle")}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-bark-800 leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {t("about.heading")}<br />
                <span className="text-brand-600 italic">{t("about.highlight")}</span>
              </h2>
              <p className="text-bark-700/80 text-base leading-relaxed mb-6">
                {t("about.p1")}
              </p>
              <p className="text-bark-700/80 text-base leading-relaxed mb-8">
                {t("about.p2")}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  Shield, Globe, Zap, HeartHandshake,
                ].map((Icon, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>{t(`about.items.${i}.title`)}</h4>
                      <p className="text-xs text-bark-700/70 mt-1 leading-relaxed">{t(`about.items.${i}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-ivory-50 py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
                <span className="w-6 h-px bg-gold-400"></span>
                {t("services.subtitle")}
                <span className="w-6 h-px bg-gold-400"></span>
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold text-bark-800 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {t("services.heading")} <span className="text-brand-600 italic">{t("services.highlight")}</span>
              </h2>
              <p className="text-bark-700/70 max-w-2xl mx-auto leading-relaxed">
                {t("services.desc")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featureKeys.map((feature) => (
              <StaggerItem key={feature.key}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-ivory-300 hover:border-gold-400 transition-all hover:shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                      <feature.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <Badge variant={feature.badge === "Core" ? "default" : "secondary"} className="text-xs bg-ivory-200 text-bark-700 hover:bg-ivory-300">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-bark-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>{t(`features.${feature.key}.title`)}</h3>
                  <p className="text-sm text-bark-700/70 leading-relaxed">{t(`features.${feature.key}.description`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-ivory-50 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-40"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
                <span className="w-6 h-px bg-gold-400"></span>
                {t("howItWorks.sectionSubtitle")}
                <span className="w-6 h-px bg-gold-400"></span>
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold text-bark-800 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {t("howItWorks.title")}
              </h2>
              <p className="text-bark-700/70 max-w-2xl mx-auto leading-relaxed">
                {t("howItWorks.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
            {steps.map((step, index) => (
              <StaggerItem key={step.key}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-ivory-100 text-2xl font-bold shadow-lg"
                      style={{ fontFamily: "var(--font-display)" }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-brand-600/30"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="relative z-10">{step.number}</span>
                    </motion.div>
                    <h3 className="mt-6 text-lg font-semibold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
                      {t(`howItWorks.${step.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-bark-700/70">
                      {t(`howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden lg:block absolute top-8 w-[80%] h-[2px] bg-gradient-to-r from-gold-400/50 to-transparent rtl:bg-gradient-to-l ${isRtl ? "right-[60%]" : "left-[60%]"}`} />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-ivory-50 py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
                <span className="w-6 h-px bg-gold-400"></span>
                {t("testimonials.sectionLabel")}
                <span className="w-6 h-px bg-gold-400"></span>
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-bark-800" style={{ fontFamily: "var(--font-display)" }}>
                {t("testimonials.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {testimonialsItems.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-2xl p-8 border border-ivory-300 hover:border-gold-400 transition-all h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-bark-700/80 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "Georgia, serif" }}>
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-brand-700" style={{ fontFamily: "var(--font-display)" }}>{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-bark-800">{testimonial.name}</p>
                      <p className="text-xs text-bark-700/50">{testimonial.location} &middot; {testimonial.treatment}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-ivory-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-bark-800 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {t("faq.title")}
              </h2>
              <p className="text-bark-700/70">{t("faq.subtitle")}</p>
            </div>
          </FadeIn>
          <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionPrimitive.Item key={index} value={`item-${index}`} className="bg-white rounded-xl border border-ivory-300 mb-3 overflow-hidden">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between px-6 py-4 font-medium transition-all hover:bg-ivory-100 text-left rtl:text-right w-full text-bark-800">
                  {item.question}
                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-200 rtl:rotate-180 [&[data-state=open]>svg]:rotate-90" />
                </AccordionPrimitive.Trigger>
                <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-6 pb-4 pt-0 text-bark-700/70">
                    {item.answer}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10"><HeartPulse className="text-brand-200 w-32 h-32 opacity-20" /></div>
          <div className="absolute bottom-10 right-10"><Activity className="text-brand-200 w-24 h-24 opacity-15 rotate-45" /></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-brand-100 text-xs tracking-[0.3em] uppercase font-medium mb-4">
              <span className="w-6 h-px bg-brand-100"></span>
              {t("cta.sectionLabel")}
              <span className="w-6 h-px bg-brand-100"></span>
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              {t("cta.title")}
            </h2>
            <p className="text-brand-100/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/triage">
                <Button className="inline-flex items-center gap-3 bg-white text-bark-800 px-10 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-ivory-100 transition-all active:scale-[0.97] shadow-lg border-0">
                  {t("cta.button")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/facilities">
                <Button variant="outline" className="inline-flex items-center gap-3 bg-transparent text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide border border-white/30 hover:bg-white/10 transition-all active:scale-[0.97]">
                  {t("hero.secondary")}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-14 text-brand-100/70">
              {[Shield, Users, Zap, HeartHandshake].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{t(`cta.trust.${i}.text`)}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ivory-200 py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-px gold-line opacity-30"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-bark-800 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            {t("newsletter.title")} <span className="text-brand-600 italic">{t("newsletter.highlight")}</span>
          </h3>
          <p className="text-bark-700/70 mb-8">{t("newsletter.desc")}</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); showToast(t("newsletter.toast")); }}>
            <input type="email" required placeholder={t("newsletter.placeholder")} className="flex-1 px-5 py-3.5 rounded-xl border border-ivory-400 bg-white text-bark-800 text-sm placeholder:text-bark-700/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" />
            <Button type="submit" className="px-8 py-3.5 rounded-xl bg-bark-800 text-ivory-100 text-sm font-semibold tracking-wide hover:bg-bark-900 transition-all active:scale-[0.97] border-0">
              <Mail className="w-4 h-4 mr-2" />
              {t("newsletter.button")}
            </Button>
          </form>
        </div>
      </section>

      {/* Toast */}
      <div className={`fixed bottom-6 ${isRtl ? "left-6" : "right-6"} z-[100] transition-all duration-500 ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}>
        <div className="bg-bark-800 text-ivory-100 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm">
          <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <p className="text-sm">{toastMsg}</p>
        </div>
      </div>

      {/* Back to Top */}
      <button
        className={`fixed bottom-6 ${isRtl ? "right-6" : "left-6"} z-50 w-12 h-12 rounded-full bg-bark-800 text-ivory-100 flex items-center justify-center shadow-lg hover:bg-bark-900 transition-all active:scale-[0.95] ${backToTopVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}

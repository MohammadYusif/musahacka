import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  DollarSign,
  Plane,
  MessageSquare,
  HeartPulse,
  ArrowRight,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "AI Smart Triage",
    description: "Upload your medical reports and get instant AI-powered analysis directing you to the right specialty and facility.",
    badge: "Core",
  },
  {
    icon: DollarSign,
    title: "Price Matching",
    description: "Compare treatment packages across facilities to find options that fit your budget and timeline.",
    badge: "Core",
  },
  {
    icon: Plane,
    title: "Travel Coordinator",
    description: "End-to-end travel coordination — visa, flights, airport pickup, and hotel booking near your hospital.",
    badge: "Coming Soon",
  },
  {
    icon: MessageSquare,
    title: "Multilingual Assistant",
    description: "Chat with our AI assistant in Arabic, English, and more — available 24/7 throughout your medical journey.",
    badge: "Core",
  },
  {
    icon: HeartPulse,
    title: "Post-Treatment Care",
    description: "Stay connected with your doctor after returning home. Medication reminders, rehab schedules, and remote follow-ups.",
    badge: "Coming Soon",
  },
];

const trustPoints = [
  { icon: Shield, text: "Verified Saudi Licensed Facilities" },
  { icon: Globe, text: "Serving Patients from 50+ Countries" },
  { icon: Zap, text: "AI-Powered Matching in Seconds" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Powered by AI &middot; Al-Ahsa, Saudi Arabia
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Medical Journey{" "}
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              From first inquiry to full recovery — MedVisit transforms international patients&apos; searches into complete, guided medical tourism experiences in Saudi Arabia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/triage">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start AI Triage <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/facilities">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Facilities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {trustPoints.map((point) => (
              <div key={point.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <point.icon className="h-4 w-4 text-primary" />
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Everything You Need in One Platform</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Five integrated modules working together to turn your medical inquiry into a successful treatment journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <Badge variant={feature.badge === "Core" ? "default" : "secondary"} className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Your Medical Journey?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Upload your medical reports and let our AI guide you to the best treatment options in Al-Ahsa and across Saudi Arabia.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/triage">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

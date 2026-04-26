"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">MedVisit</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">Al-Ahsa</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/triage" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">AI Triage</Link>
          <Link href="/facilities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Facilities</Link>
          <Link href="/chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Assistant</Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Globe className="h-4 w-4" />
          </Button>
          <Link href="/login">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden md:inline-flex">Get Started</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link href="/triage" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>AI Triage</Link>
          <Link href="/facilities" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Facilities</Link>
          <Link href="/chat" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Assistant</Link>
          <Link href="/dashboard" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <div className="flex gap-2 pt-2">
            <Link href="/login" className="flex-1"><Button variant="outline" className="w-full" size="sm">Sign In</Button></Link>
            <Link href="/register" className="flex-1"><Button className="w-full" size="sm">Get Started</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

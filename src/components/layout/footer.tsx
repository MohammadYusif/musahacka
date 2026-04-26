import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-primary-foreground font-bold text-xs">M</span>
              </div>
              <span className="font-bold">MedVisit Al-Ahsa</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your AI-powered gateway to medical tourism in Saudi Arabia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/triage" className="hover:text-foreground transition-colors">AI Triage</Link></li>
              <li><Link href="/facilities" className="hover:text-foreground transition-colors">Facilities</Link></li>
              <li><Link href="/chat" className="hover:text-foreground transition-colors">Chat Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Al-Ahsa, Eastern Province</li>
              <li>Saudi Arabia</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MedVisit Al-Ahsa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

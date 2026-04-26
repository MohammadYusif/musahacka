# MedVisit Al-Ahsa | AI Medical Tourism Assistant

An AI-powered platform that transforms international patients' medical inquiries into complete, guided medical tourism experiences in Al-Ahsa, Saudi Arabia.

## Features

- **AI Smart Triage** — Upload medical reports and get instant AI-powered analysis with specialty and facility recommendations
- **Facilities Browser** — Browse verified hospitals and clinics with filtering by specialty, doctor profiles, and treatment packages
- **Multilingual Chatbot** — Real-time AI assistant in Arabic and English, available 24/7
- **Patient Dashboard** — Overview of reports, appointments, and chat history
- **i18n Support** — Full Arabic (RTL) and English localization with language switcher

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui components |
| Database | PostgreSQL via Prisma 7 (Supabase-ready) |
| Auth | NextAuth.js (credentials + Google OAuth) |
| AI | OpenAI GPT-4o (triage) + GPT-4o-mini (chat) |
| i18n | next-intl with RTL support |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- OpenAI API key

### Setup

1. Clone and install:
```bash
git clone <repo-url>
cd musahacka
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database URL, OpenAI key, etc.
```

3. Set up database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### npm Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm:db:seed` | Seed database with sample data |
| `npm:db:studio` | Open Prisma Studio |

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n-routed pages
│   │   ├── page.tsx       # Landing page
│   │   ├── triage/        # AI Triage module
│   │   ├── facilities/    # Facilities browser
│   │   ├── chat/          # Multilingual chatbot
│   │   ├── dashboard/     # Patient dashboard
│   │   ├── login/         # Sign in
│   │   └── register/      # Registration
│   └── api/               # API routes
│       ├── auth/          # NextAuth + registration
│       ├── triage/        # AI analysis endpoint
│       ├── chat/          # Streaming chat endpoint
│       └── facilities/    # Facilities data endpoint
├── components/
│   ├── ui/               # shadcn/ui base components
│   ├── layout/           # Header, Footer
│   ├── triage/           # File upload, analysis results
│   ├── facilities/       # Facility cards, detail dialog
│   ├── chat/             # Chat interface
│   └── providers/        # Auth, i18n providers
├── i18n/
│   ├── messages/         # en.json, ar.json
│   ├── routing.ts        # Locale routing config
│   ├── navigation.ts     # i18n Link, useRouter
│   └── request.ts        # next-intl request config
├── lib/
│   ├── prisma.ts         # Prisma client singleton
│   ├── auth.ts           # NextAuth configuration
│   ├── openai.ts         # OpenAI client + prompts
│   └── utils.ts          # cn() utility
└── generated/prisma/     # Prisma generated client
```

## Demo Flow (3-minute pitch)

1. **Landing** — Show the hero, features, and trust bar
2. **Triage** — Upload a sample medical report → watch AI analyze it in real-time
3. **Facilities** — Show filtered results matching the recommended specialty
4. **Chat** — Ask the assistant about travel arrangements
5. **Dashboard** — Show the complete patient journey overview
6. **Language Switch** — Toggle to Arabic to demonstrate RTL support

## License

MIT

# Wisal | AI Medical Tourism Platform

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
| Database | PostgreSQL via Prisma 7 |
| Auth | NextAuth.js (credentials + Google OAuth) |
| AI | OpenAI GPT (triage + chat) |
| i18n | next-intl with RTL support |
| Container | Docker / Docker Compose |

## Getting Started

### Prerequisites

- **Docker Desktop** (must be running) — provides PostgreSQL
- **Node.js 22+** and **npm**
- **OpenAI API key** (for AI triage & chat features)

### Setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd musahacka
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your `OPENAI_API_KEY`. The default values work for everything else.

3. **Start the database**
   ```bash
   docker compose up -d db
   ```
   This starts PostgreSQL on port 5432. Wait a few seconds for it to become healthy.

4. **Migrate and seed**
   ```bash
   npm run db:setup
   ```
   This generates the Prisma client, applies migrations, and seeds the database with 4 facilities, doctors, treatment packages, and a demo user.

5. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

### Docker (full stack)

To run both the app and database in containers:
```bash
docker compose up --build
```

### Demo access

After seeding, you can sign in with:
- **Email:** `patient@example.com`
- The seed creates a demo user — check `prisma/seed.ts` for the password hash config

## npm Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:setup` | Generate Prisma client + migrate + seed (all-in-one) |
| `npm run db:generate` | Generate Prisma client only |
| `npm run db:migrate` | Run pending database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (GUI) |

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # i18n-routed pages
│   │   ├── page.tsx        # Landing page
│   │   ├── about/          # About Us
│   │   ├── story/          # Our Story
│   │   ├── faq/            # FAQ
│   │   ├── contact/        # Contact Us
│   │   ├── privacy/        # Privacy Policy
│   │   ├── terms/          # Terms of Service
│   │   ├── triage/         # AI Triage module
│   │   ├── facilities/     # Facilities browser
│   │   ├── chat/           # Multilingual chatbot
│   │   ├── dashboard/      # Patient dashboard
│   │   ├── login/          # Sign in
│   │   └── register/       # Registration
│   └── api/                # API routes
│       ├── auth/           # NextAuth + registration
│       ├── triage/         # AI analysis endpoint
│       ├── chat/           # Streaming chat endpoint
│       └── facilities/     # Facilities data endpoint
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Header, Footer
│   ├── triage/             # File upload, AgentStepReveal, JourneyCard
│   ├── facilities/         # Facility cards, detail dialog
│   ├── chat/               # Chat interface
│   └── providers/          # Auth, i18n providers
├── i18n/
│   ├── messages/           # en.json, ar.json
│   ├── routing.ts          # Locale routing config
│   ├── navigation.ts       # i18n Link, useRouter
│   └── request.ts          # next-intl request config
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── auth.ts             # NextAuth configuration
│   ├── openai.ts           # OpenAI client + prompts
│   ├── use-specialty.ts    # i18n hook for specialty names
│   ├── use-package.ts      # i18n hooks for package items/durations
│   └── utils.ts            # cn() utility
└── generated/prisma/       # Prisma generated client (gitignored)
```

## Demo Flow

1. **Landing** — Hero, philosophy, services, how it works, testimonials, FAQ
2. **Triage** — Upload a medical report → AI Agent step reveal → analysis results
3. **Facilities** — Filtered results matching the recommended specialty
4. **Chat** — Ask the assistant about travel arrangements or facilities
5. **Dashboard** — Overview of reports, appointments, and chat history
6. **Language Switch** — Toggle to Arabic to demonstrate full RTL support

## Localization

All UI text is fully translated via `next-intl`. Every visible string uses a translation key in both English (`en.json`) and Arabic (`ar.json`). Medical specialty names, package items, and duration labels also have translation maps with fallback to English. RTL layout is fully supported via `[dir="rtl"]` CSS rules and bidirectional component logic.

## License

MIT

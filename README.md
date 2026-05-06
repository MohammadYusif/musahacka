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

### Option 1: Docker (recommended)

1. Clone the repo:
```bash
git clone <repo-url>
cd musahacka
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key at minimum
```

3. Start everything (database + app):
```bash
docker compose up --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

The Docker setup automatically:
- Starts a PostgreSQL 16 container
- Runs database migrations on startup
- Seeds the database with sample data

### Option 2: Local development

#### Prerequisites
- Node.js 18+
- PostgreSQL database (or Docker for just the DB)
- OpenAI API key

#### Setup

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
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

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
│   ├── triage/             # File upload, analysis results
│   ├── facilities/         # Facility cards, detail dialog
│   ├── chat/               # Chat interface
│   └── providers/          # Auth, i18n providers
├── i18n/
│   ├── messages/           # en.json, ar.json (242 keys each)
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
└── generated/prisma/       # Prisma generated client
```

## Demo Flow

1. **Landing** — Hero, philosophy, services, how it works, testimonials, FAQ
2. **Triage** — Upload a sample medical report → watch AI analyze it
3. **Facilities** — Filtered results matching the recommended specialty
4. **Chat** — Ask the assistant about travel arrangements or facilities
5. **Dashboard** — Overview of reports, appointments, and chat history
6. **Language Switch** — Toggle to Arabic to demonstrate full RTL support

## Localization

All UI text is fully translated via `next-intl`. Every visible string uses a translation key (242 keys in both English and Arabic). Medical specialty names, package items, and duration labels also have translation maps with fallback to English.

## License

MIT

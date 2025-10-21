# Dommer-GPT - AI Prompt Judge

En simpel Next.js app til at vurdere AI prompts for kursusdeltagere.

## Setup

### 1. Kopiér filer til dit projekt

Kopiér alle filerne til: `C:\Users\sebas\Projects\fortsætter-kursus-ai-judge`

Filstruktur skal være:
```
fortsætter-kursus-ai-judge/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

### 2. Installér dependencies

Åbn terminal i projektmappen og kør:
```bash
npm install
```

### 3. Tilføj din OpenAI API key

Rediger `.env.local` og tilføj din API key:
```
OPENAI_API_KEY=sk-din-rigtige-key-her
```

### 4. Test lokalt

Kør udviklings-server:
```bash
npm run dev
```

Åbn browser på: http://localhost:3000

Test med kode: **aof**

## Deploy til Vercel

### Option 1: Via GitHub (Anbefalet)

1. **Opret GitHub repo**
   - Gå til github.com
   - Klik "New repository"
   - Navngiv det (f.eks. "ai-dommer")
   - Klik "Create repository"

2. **Push kode til GitHub**
   Åbn terminal i projektmappen:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DIT-BRUGERNAVN/ai-dommer.git
   git push -u origin main
   ```

3. **Deploy fra Vercel**
   - Gå til vercel.com/new
   - Klik "Import Git Repository"
   - Vælg dit repo
   - Tilføj Environment Variable:
     - Name: `OPENAI_API_KEY`
     - Value: [din API key]
   - Klik "Deploy"

### Option 2: Direkte upload

1. Gå til vercel.com/new
2. Klik "Upload" i stedet for Git
3. Drag projektmappen
4. Tilføj Environment Variable som ovenfor
5. Deploy

## Efter deployment

1. Få URL'en fra Vercel (f.eks. ai-dommer.vercel.app)
2. Del linket med kursusdeltagere
3. Fortæl dem koden: **aof**

## Teknisk info

- **Model**: GPT-4o
- **Framework**: Next.js 14
- **Kode**: aof (case-insensitive)
- **Hosting**: Vercel

## Support

Hvis noget ikke virker, tjek:
1. Er OPENAI_API_KEY sat korrekt?
2. Er alle filer i de rigtige mapper?
3. Har du kørt `npm install`?

# WindHero

> **Master the Wind.**
> A modern sailing academy and exploration community — built as a Next.js + Supabase site, deployed on Vercel.

WindHero is not a traditional sailing club. It is a school for people who want to learn the wind, plot real passages, and develop the captain's mind. This repository is the public site and content surface — courses, voyages, journal, and manifesto — plus the lightweight Supabase backend behind the newsletter (more surfaces will land later).

---

## Stack

| Layer        | Choice                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| Framework    | **Next.js 16** (App Router, RSC, Turbopack)                            |
| Language     | TypeScript (strict)                                                    |
| Styling      | Tailwind CSS v4 (custom WindHero theme tokens in `globals.css`)        |
| UI primitives| Hand-rolled, Lucide icons                                              |
| Backend      | **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) — newsletter only for now |
| Hosting      | **Vercel** (Fluid Compute, Node.js 24)                                 |
| Fonts        | Inter (sans), Cormorant Garamond (display serif), JetBrains Mono       |

There is **no user-account / login** in this iteration, per spec. The single backend surface today is `POST /api/subscribe` that upserts an email into a Supabase `subscribers` table.

---

## Local development

```bash
pnpm install
cp .env.example .env.local        # optional — Supabase keys (see below)
pnpm dev                          # http://localhost:3000
```

Useful scripts:

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Run the dev server (Turbopack)           |
| `pnpm build`       | Production build                         |
| `pnpm start`       | Run the production build locally         |
| `pnpm lint`        | ESLint                                   |
| `pnpm typecheck`   | TypeScript strict typecheck              |

Supabase is **optional locally**. If `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, `/api/subscribe` succeeds with `{ ok: true, pending: true }` and logs the email server-side, so the UI still works without a backend.

---

## Project structure

```
src/
  app/
    layout.tsx               root layout (fonts, header, footer)
    page.tsx                 home
    courses/page.tsx         curriculum
    voyages/page.tsx         atlas of routes & marinas
    journal/page.tsx         long-form entries
    manifesto/page.tsx       brand manifesto
    about/page.tsx           crew + contact
    api/subscribe/route.ts   newsletter endpoint
    icon.svg                 favicon
    globals.css              Tailwind v4 theme + animations
  components/
    site-header.tsx
    site-footer.tsx
    hero.tsx
    section.tsx
    newsletter-form.tsx
  lib/
    content.ts               courses / voyages / journal data
    utils.ts                 cn() helper
    supabase/
      client.ts              browser client
      server.ts              server + service-role clients
supabase/
  schema.sql                 subscribers table + RLS policies
.env.example                 env var template
```

---

## Supabase setup (when you're ready)

1. Create a new project at <https://supabase.com>.
2. Open **SQL editor** and run [`supabase/schema.sql`](supabase/schema.sql). This creates `public.subscribers` and the RLS policies so anonymous browsers can insert (but not read) addresses.
3. In **Project settings → API**, copy these into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` *(server only — used by `/api/subscribe` to upsert past RLS)*
4. Restart `pnpm dev`. Subscribing from the footer should now write a row.

When the time comes for accounts, `lib/supabase/client.ts` and `lib/supabase/server.ts` are already wired with `@supabase/ssr`, so adding auth means dropping in middleware + a couple of routes — no rewiring.

---

## Deploy to Vercel

The repository is ready to deploy as-is.

### One-time

1. Push to GitHub — already configured at <https://github.com/coolboylcy/WindHero>.
   ```bash
   git init && git add . && git commit -m "WindHero: initial site"
   git remote add origin git@github.com:coolboylcy/WindHero.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, **Import** the `coolboylcy/WindHero` repo. Vercel auto-detects Next.js — leave the defaults.
3. **Environment variables** (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://windhero.app`)
4. **Deploy.** Production gets a `*.vercel.app` URL immediately; point your custom domain (e.g. `windhero.app`) at it under **Domains**.

### Via CLI

```bash
pnpm i -g vercel@latest      # 54.3+ recommended
vercel link                  # link this folder to a Vercel project
vercel env pull .env.local   # pull production envs to local
vercel deploy                # preview deploy
vercel deploy --prod         # production deploy
```

---

## Brand direction (kept in code)

These tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme {…}` so every page picks them up automatically:

| Token       | Hex        | Meaning                                    |
| ----------- | ---------- | ------------------------------------------ |
| `--color-ink`   | `#05131f` | Deep-night ocean — page background        |
| `--color-deep`  | `#0a1f33` | Mid-ocean — section backgrounds           |
| `--color-ocean` | `#102a43` | Lighter water                              |
| `--color-mist`  | `#cfd9e2` | Cool grey — secondary text                |
| `--color-sail`  | `#f5f2ea` | Sail white — primary text on dark         |
| `--color-gold`  | `#c8a96a` | Brass / brass-instrument accent           |
| `--color-rust`  | `#9c5a3c` | Error / warning, rope-weathered           |

Typography pairs **Cormorant Garamond** (display, used via the `.display` utility) with **Inter** (UI) and **JetBrains Mono** (data, coordinates, hull numbers).

---

## Roadmap (intentionally short)

- [ ] Voyage detail pages with day-by-day passage briefs
- [ ] Course detail pages (curriculum, instructor, syllabus PDF)
- [ ] MDX journal entries (replace the inline `longform` map in `journal/page.tsx`)
- [ ] Captain login + cohort dashboards (Supabase Auth)
- [ ] OG image generation (`opengraph-image.tsx`) per route

---

## License

All content © WindHero. Source code MIT.

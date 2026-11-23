# Abdelrhman Islam — Portfolio

Personal portfolio website: a single-page site built with Next.js (App Router), focused on cybersecurity & machine learning work.

**Live sections:** Hero, animated skills marquee, About, Projects, Skills, Education, Manifesto, Contact.

## Tech Stack

- [Next.js 15.5.29](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for motion effects
- [lucide-react](https://lucide.dev/) — icons
- Google Fonts via `next/font` (Bricolage Grotesque, Instrument Sans, JetBrains Mono)

## Features

- Dark mode (class-based toggle, persisted in `localStorage`, flash-free via inline head script)
- Monochrome design system driven by CSS variables
- Scroll progress bar, scramble text, magnetic hover, and reveal-on-scroll effects
- Most site content lives in one editable data file (`data/profile.js`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/            # layout.js (fonts, metadata, nav) + page.js (section composition)
components/     # One component per section + animation helpers (Reveal, ScrambleText, Magnetic...)
data/profile.js # Central content: bio, projects, skills, socials
public/         # Static assets (favicon.svg, resume.pdf)
```

To update any content (links, projects, focus areas, skills), edit `data/profile.js` — no component changes needed.

## Checks

Use Node.js 22, then run `npm ci`, `npm run build` and `npm test`.
For browser tests, install Chromium with `npx playwright install chromium`.
Locally, set `CHROME_BIN` to an installed Chrome executable if needed; CI uses Playwright's Chromium.
`npm audit` checks the current dependency advisory database.
See `REVIEW.md` for the draft's changes, scope and media provenance.

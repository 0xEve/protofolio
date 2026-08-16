# Abdelrhman Islam — Portfolio

Personal portfolio website: a single-page site built with Next.js (App Router), focused on cybersecurity & machine learning work.

**Live sections:** Hero, animated skills marquee, About, Projects, Skills, Education, Manifesto, Contact.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — scroll/reveal animations
- [lucide-react](https://lucide.dev/) — icons
- Google Fonts via `next/font` (Bricolage Grotesque, Instrument Sans, JetBrains Mono)

## Features

- Dark mode (class-based toggle, persisted in `localStorage`, flash-free via inline head script)
- Monochrome design system driven by CSS variables
- Scroll progress bar, scramble text, magnetic hover, and reveal-on-scroll effects
- All site content lives in one editable data file (`data/profile.js`)

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
data/profile.js # Single source of truth for ALL content: bio, projects, skills, socials
public/         # Static assets (favicon.svg, resume.pdf)
```

To update any content (links, projects, stats, skills), edit `data/profile.js` — no component changes needed.

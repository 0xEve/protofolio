# Portfolio review draft

Prepared against main commit b4a726cf6ff5accb2b6930ac0865a4e998db8ee6.
This draft does not change production. Review before merge or deployment.

## Changes
- About paragraph is ordinary server-rendered text, visible without JavaScript.
- Section reveal wrappers never hide content. Stats are readable without counting animations.
- Real project media replaces geometric covers and misleading Case study labels.
- Project cards include concrete implementation details, caveats, GitHub links and a direct spam demo link.
- Removed the standalone 94% accuracy stat. The spam project's current train_model.py fits TF-IDF before splitting data, which can leak test-set information. Re-evaluate that project separately before publishing model scores.
- Hero offers direct project and CV actions. Long first name fits 320px screens.
- Muted text contrast, keyboard focus, skip navigation and section anchor offsets improved.
- Mobile menu supports Escape, focus containment/restoration and scroll locking.
- Reduced-motion users get a still marquee and unscrambled role text.
- Next.js updated from 14.2.15 to 15.5.29; current dependency audit is clean. PostCSS override is required for Next 15's bundled dependency and is covered by the build check.
- Playwright regression tests and GitHub Actions checks added.
- Environment files excluded from future accidental commits. Existing tracked .env was not copied into delivery archives. Review the existing public file separately if it ever contained credentials.

## Verification
- npm ci
- npm audit: zero known vulnerabilities at preparation time, not a guarantee of security.
- npm run build
- npm test: responsive checks at 320, 390, 768 and 1280px, mobile navigation, project image loading, page errors and no-JavaScript essentials.
- Manual visual inspection of desktop and mobile screenshots.

## Media provenance
- EVHunter help: actual `python main.py --help` output from 0xEve/Ev_Hunter, rendered with Rich. No scan was run. The help command initializes EVHunter's local configuration/database but does not contact a target.
- Spam image: actual landing-page capture from https://spam-detection-sigma-seven.vercel.app/. Predictions were not tested.

## Not changed
No CV, contact details, qualifications, project outcomes or model scores were invented or updated. No changes to either project repository. No main-branch push or production deployment.

## Revision after owner feedback
- Replaced the EVHunter CLI screenshot with a native monochrome workflow overview, explicitly labeled as an overview rather than a scan result. The original screenshot remains unused in assets.
- Reworked Who I Am into a shorter student bio with smaller type, quiet focus/learning details and no numeric sidebar.
- Preserved production unchanged.

- After further owner feedback, replaced the Spam Detector screenshot with a native text-classification diagram. It shows the real TF-IDF/Naive Bayes approach and two labels, not a sample prediction or claimed result. Both previous screenshots remain unused assets.

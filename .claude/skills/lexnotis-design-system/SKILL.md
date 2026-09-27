---
name: lexnotis-design-system
description: The LexNotis design system and taste reference. Load before creating or changing ANY visual part of the LexNotis site (pages, sections, components, motion, copy on marketing pages). Encodes tokens, type scale, spacing, radius, motion rules, component recipes, and the real reference sites to borrow from, so output looks like LexNotis and never like a generic AI template.
---

# LexNotis design system

LexNotis is a Sarthe-based agency that builds custom AI assistants and automations for French SMBs
(PME, artisans, agences, commerces). The audience is busy and often **wary of AI**. The site must feel
**calm, precise, human and local**, never "AI hype".

Design read: *redesign-overhaul of a local AI agency site for French SMB owners, calm premium-editorial
language, Linear/Vercel crispness warmed by real Le Mans photography and real people.*
Taste dials (see `design-taste-frontend`): VARIANCE 7, MOTION 5, DENSITY 4.

Other skills to combine with this one:
- `design-taste-frontend` for layout discipline and the pre-flight checklist (anti-slop).
- `emil-design-eng` / `animate` / `review-animations` for anything that moves.
- `redesign-existing-projects` when touching a page that was not yet redesigned.
- `mobile-native` for touch details, `ask-sonner` for toasts (the site uses Sonner).

---

## 1. Tokens (source of truth: `src/styles.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.985 0.003 286)` (#fafafc) | page |
| `--foreground` | `oklch(0.2 0.018 286)` (#15151e) | text, ink buttons |
| `--muted-foreground` | `oklch(0.5 0.018 286)` (#62626d, 5.8:1) | secondary text |
| `--card` | `oklch(0.997 0.001 286)` | surfaces |
| `--violet` / `bg-brand` | `oklch(0.52 0.215 289)` (#6c44d9, 5.9:1 with white) | THE accent |
| `--violet-soft` / `bg-brand-soft` | `oklch(0.955 0.028 289)` | tinted panels, icon chips |
| `--night` | `oklch(0.16 0.025 286)` | the one dark block (closing CTA + footer) |

Rules:
- **One accent**: violet. Use it for one word in a headline, primary buttons, icons, links. Never two
  hues in a gradient, never gradient text, never glows (`shadow-glow` is now a quiet tinted shadow).
- Neutrals are cool and slightly violet-tinted. No pure `#000` / `#fff`.
- Borders are 9% ink. Prefer `shadow-[0_0_0_1px_var(--border)]` rings over `border` on cards
  (crisper on retina, no layout shift).
- Dark mode: the page is light-locked. The only dark area is `footer.dark` (and one highlighted
  pricing card). Wrap dark areas in the `.dark` class so all tokens flip automatically.

## 2. Typography

Geist (self-hosted in `public/fonts`, OFL) for everything, Geist Mono for small labels and figures.
No new font without a reason tied to the brand.

| Class | Size | Use |
| --- | --- | --- |
| `.type-display` | clamp(40 → 76px), 600, -0.045em, lh 0.98 | one H1 per page |
| `.type-h2` | clamp(32 → 52px), 600, -0.04em | section titles |
| `.type-h3` | 20-24px, 600, -0.025em | card / item titles |
| `.type-lead` | 17-20px, muted, lh 1.5 | the paragraph under a title |
| `.type-label` | Geist Mono 12px, muted | rare small labels (max 1 per 3 sections) |

- Headlines end with a period. Emphasis = one phrase in `text-brand`, same font.
- Use the typographic apostrophe `’` in display headlines (`L’intelligence`).
- **No em-dash (—) in visible copy.** Use a colon, comma or period. SEO `<title>` strings and legal
  copy are left untouched.
- Body text: 15-17px, `leading-relaxed`, max ~65ch. Numbers: `.tabular`.
- French typography: non-breaking space before `? ! : ;` is fine as a normal space in JSX.

## 3. Layout & spacing

- Container: `.container-page` (max 76rem, 20px gutter mobile, 32px desktop).
- Section rhythm: `py-24 md:py-32`. Title → content gap: `mt-14`.
- Left-aligned titles by default. Centered only for short, standalone statements (integrations).
- Grids: 12 columns. Asymmetric splits (5/7, 6/6 with offset). Collapse to one column under `md`.
- Never repeat a layout family on the same page. Families already used on the home page: split hero,
  marquee, bento, sticky split list, metrics row, product panel, photo collage, logo grid.
- Hero: fits in the first viewport, headline ≤ 3 short lines, subtext ≤ 20 words, max 2 CTAs.

## 4. Shape

- Buttons, chips, launcher: full pill.
- Cards and media: `rounded-3xl` (24px). Big panels: `rounded-[28px]`/`[32px]`. Small tiles, inputs,
  icon squares: `rounded-xl` / `rounded-2xl`.

## 5. Components (reuse before creating)

| Need | Use |
| --- | --- |
| Button / link button | `GradientLink` / `GradientButton` (`variant`: primary, ink, ghost; `size`: md, sm) or `.btn .btn-primary` |
| Page opener | `PageHero` (label, title, lead, actions, aside) |
| Scroll reveal | `Reveal` (`delay` 40-80ms steps, `as="li"`) |
| Load stagger | `className="enter" style={stagger(n)}` from `@/lib/motion` |
| Closing CTA | automatic in `Footer`; set per page with `staticData: { cta: { title, text } }` |
| Surfaces | `.surface` (card), `.surface-float` (elevated preview) |
| Product proof | `PhoneChatMockup`, `DashboardPreview`, `OfferBento` workflow visual |
| Numbers | `AnimatedCounter` (DOM-driven, reduced-motion safe) |

CTA wording: one label per intent. Contact intent = **"Discuter de mon projet"** everywhere.

## 6. Motion (from Emil Kowalski's rules)

- Curves: `ease-out` utility = `cubic-bezier(0.23, 1, 0.32, 1)`; `ease-in-out` =
  `cubic-bezier(0.77, 0, 0.175, 1)`; `ease-drawer` for sheets. Never `ease-in` on UI.
- Durations: press 150ms, hover/color 200ms, dropdown/accordion 250-300ms, page-load reveals 700-900ms.
- Only animate `transform`, `opacity`, `filter` (blur ≤ 6px). No `transition-all`.
- Every pressable gets `active:scale-[0.97]` (built into `.btn`). Hover effects only under
  `@media (hover: hover) and (pointer: fine)`.
- Popovers/menus scale from their trigger (`origin-bottom-right` for the chat window).
- No `window.addEventListener("scroll")`: use IntersectionObserver, CSS scroll-driven animations.
- One marquee per page max. No perpetual floating/pulsing decoration.
- Every animation has a reduced-motion fallback (already handled for `.enter`, `.reveal`, marquee).

## 7. Imagery

- Real photography first: Le Mans (`vieux-mans`, `remparts-mans`, `cathedrale-mans`) and the founder
  portrait (`gabin.png`, transparent cutout, looks best on `bg-brand-soft`).
- Import Lovable assets through their manifests: `import img from "@/assets/x.jpg.asset.json"` → `img.url`.
- Product visuals are real, small UI (chat, workflow, dashboard) with sample data, never
  abstract blobs or AI-generated glass cards.
- Captions under photos are factual (`La cathédrale Saint-Julien`), never overlaid on the image.

## 8. Taste references (study, then borrow the principle, never the pixels)

| Site | What to borrow |
| --- | --- |
| linear.app | Typographic restraint, one accent, hairline structure, confident short headlines |
| vercel.com | Geist in use, grids, dark closing section + footer as one block |
| stripe.com | Product-as-hero: real UI as the main illustration |
| pennylane.com | Talking to French SMB owners: clear benefit-led copy, reassuring tone |
| qonto.com | French B2B trust: calm palette, generous whitespace, simple pricing presentation |
| alan.com | Warm, human French brand voice; friendly without being childish |
| resend.com | Polish of dark CTA blocks and code-like mono details |
| raycast.com | Motion restraint: fast, purposeful, never decorative |
| attio.com | Bento grids with real product content inside cells |
| apple.com/fr | Photography at scale, one message per section |
| emilkowal.ski, rauno.me | Micro-interaction details (press, origin, easing) |

When designing a new section: name 2 references and the specific principle taken from each in your
plan, then build it with the tokens above.

## 9. Never change silently

Route slugs, nav labels, form field names/order, legal pages copy, cookie/consent copy, SEO
`head()` metadata and JSON-LD, the logo. Ask first.

## 10. Verify before saying "done"

1. `tools/preview/serve.sh` then `node tools/preview/screenshots.mjs screenshots/current --only=/route`
   (or the Playwright MCP) at 1440px and 390px. Look at the images.
2. Run the `design-taste-frontend` pre-flight checklist (section 14) and `review-animations` on new motion.
3. `grep -rn "—" src --include=*.tsx` shows nothing in visible marketing copy.
4. `cd tools/preview && npx tsc -p tsconfig.json --noEmit` has no new errors.

---
name: concevoir
description: End-to-end design workflow for the LexNotis site, driven by a plain-French description. Use when the user describes a page, section or change they want ("je veux une page…", "refais la section…", "ajoute…"), or runs /concevoir. Plans from real references, builds with the LexNotis design system, then previews, screenshots and self-reviews with Playwright before handing back.
---

# /concevoir : de la description au rendu vérifié

The user describes what they want in French, often briefly. Your job is to do everything else:
design, build, test and show the result. Reply to the user in French.

## 1. Comprendre (no code yet)

- Load `lexnotis-design-system` (mandatory), then `design-taste-frontend`.
- Restate the brief in one line: *"Je lis ça comme : <type de page> pour <public>, ton <…>."*
- If a Figma link is given and the Figma MCP is connected, read that node first with the Figma MCP
  tools (design context, screenshot, variables), and translate its values into LexNotis tokens (never
  paste raw hex values or pixel fonts from Figma).
- Ask **one** question only if two readings would give very different pages. Otherwise proceed.

## 2. Planifier

Write a short plan (in the chat, 5-10 lines):
- sections in order, each with its layout family (no family twice on a page);
- for each important section: 2 references from the design-system table and the principle borrowed;
- the content you need: reuse existing copy and claims from the site first; never invent figures,
  client names, reviews or guarantees. Mark any placeholder clearly and list it at the end.

## 3. Construire

- Reuse components (`PageHero`, `Reveal`, `GradientLink`, `OfferBento`, `PhoneChatMockup`,
  `DashboardPreview`) and tokens. New component only if nothing fits.
- New route = new file in `src/routes/` with a full `head()` (title, description, og, canonical) and
  a `staticData.cta` for the closing message.
- No new npm dependency without asking (the site is synced with Lovable).
- Motion: follow `emil-design-eng`; entrance with `.enter` / `Reveal`, press feedback, reduced motion.

## 4. Tester et capturer

```bash
tools/preview/serve.sh                      # http://127.0.0.1:4173
node tools/preview/screenshots.mjs screenshots/current --only=/ma-page
node tools/preview/sections.mjs /ma-page screenshots/sections 1440
node tools/preview/sections.mjs /ma-page screenshots/sections-mobile 390
```

Or, if the Playwright MCP is connected: `browser_navigate` to the local URL, `browser_resize` to
1440×900 then 390×844, `browser_take_screenshot`, and interact (menus, forms, chat) with
`browser_click` / `browser_type`. Check the console for errors.

Open every screenshot and critique it honestly: hierarchy, spacing rhythm, alignment, contrast,
wrapped buttons, orphan words in headlines, empty areas, mobile collapse.

## 5. Relire et corriger

- Run the pre-flight checklist of `design-taste-frontend` (section 14).
- Run `review-animations` on anything that moves.
- Fix, re-capture, compare. At least one improvement pass is expected.

## 6. Livrer

- Commit with a clear message (English is fine), push to the working branch.
- Tell the user, in French and briefly: what was built, where to look (route), the screenshots you
  checked, and any placeholder content they must provide.
- Offer to send the result to Figma (the Figma MCP can write the live page to the canvas as editable
  layers) if they want to iterate visually.

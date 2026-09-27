# LexNotis : instructions pour Claude

Site vitrine + espace client de LexNotis (agence IA sur-mesure en Sarthe). Stack : TanStack Start
(React 19), Tailwind v4, shadcn/ui, Sonner, Supabase. Projet d'origine hébergé sur **Lovable**.

## Ce que contient ce dépôt

- `src/`, `public/`, `email-templates/` : export des fichiers de design du projet Lovable.
  Certains modules n'existent que côté Lovable (client Supabase, `@/hooks/useAuth`,
  `@/lib/*.functions`, `routeTree.gen.ts`, fichiers `*.asset.json`). Ne pas les recréer dans `src/`.
- `tools/preview/` : banc d'essai local qui rend le vrai `src/` avec des stubs pour ces modules.
- `.claude/skills/` : skills de design (voir `.claude/skills/README.md`).
- `.mcp.json` : serveurs MCP Figma (remote) et Playwright.

## Avant tout travail visuel

1. Charger la skill `lexnotis-design-system` (obligatoire), puis `design-taste-frontend`.
2. Pour toute animation : `emil-design-eng`, puis `review-animations` avant de livrer.
3. Pour une demande décrite en français ("je veux une page…") : suivre la skill `concevoir`.

## Prévisualiser et tester

```bash
tools/preview/serve.sh                                   # http://127.0.0.1:4173
node tools/preview/screenshots.mjs screenshots/current   # toutes les pages, desktop + mobile
node tools/preview/screenshots.mjs out --only=/,/tarifs  # quelques pages
node tools/preview/sections.mjs / out/sections 390        # chaque section, largeur mobile
cd tools/preview && npx tsc -p tsconfig.json --noEmit     # typecheck (erreurs connues : lovable-error-reporting, reset-password)
```

Avec le MCP Playwright : naviguer sur `http://127.0.0.1:4173`, tester en 1440×900 et 390×844,
capturer, lire la console. Les logos (svgl.app, simpleicons) peuvent être bloqués en bac à sable :
`screenshots.mjs` les remplace automatiquement.

## Figma

MCP distant `https://mcp.figma.com/mcp` (authentification OAuth via `/mcp` dans Claude Code).
Lire un cadre Figma à partir de son lien, puis traduire ses valeurs dans nos tokens : jamais de hex
ou de tailles en dur copiés depuis Figma.

## Règles du projet

- Pas de nouvelle dépendance npm sans accord (le projet est synchronisé avec Lovable). Les polices
  sont auto-hébergées dans `public/fonts/`.
- Ne jamais modifier sans demander : URLs des routes, libellés de navigation, champs de formulaire,
  textes légaux / cookies, métadonnées SEO et JSON-LD, logo.
- Pas de tiret cadratin (—) dans les textes visibles des pages marketing.
- Un seul libellé par intention : contact = "Discuter de mon projet".
- Répondre à l'utilisateur en français.

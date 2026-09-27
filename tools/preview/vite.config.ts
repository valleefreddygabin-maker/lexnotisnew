// Local preview harness for the LexNotis site.
// Renders the real `src/` with TanStack Start, and falls back to `stubs/`
// for modules that only exist in the Lovable project (Supabase, server fns…).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const src = path.join(repo, "src");
const stubs = path.join(here, "stubs");
const exts = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

function findFile(base: string) {
  for (const e of exts) {
    const p = base + e;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

function lovableShims(): Plugin {
  return {
    name: "lexnotis-preview-shims",
    enforce: "pre",
    async resolveId(source, importer) {
      // Lovable asset manifests: `foo.png.asset.json` -> { url }
      if (source.endsWith(".asset.json")) {
        const rel = source.startsWith("@/")
          ? path.join(src, source.slice(2))
          : path.isAbsolute(source)
            ? source
            : path.resolve(path.dirname(importer ?? src), source);
        return "\0asset:" + rel.replace(/\.asset\.json$/, "");
      }
      let target: string | null = null;
      if (source.startsWith("@/")) target = path.join(src, source.slice(2));
      else if (source.startsWith(src)) target = source;
      else if (source.startsWith(".") && importer?.startsWith(src))
        target = path.resolve(path.dirname(importer), source);
      if (!target || !target.startsWith(src)) return null;
      if (findFile(target)) return findFile(target);
      const stub = findFile(path.join(stubs, path.relative(src, target)));
      return stub ?? null;
    },
    load(id) {
      if (id.startsWith("\0asset:")) {
        const file = id.slice("\0asset:".length);
        return `import url from ${JSON.stringify(file)}; export default { url };`;
      }
    },
  };
}

export default defineConfig({
  root: repo,
  publicDir: path.join(repo, "public"),
  resolve: { alias: { "@": src } },
  server: { fs: { allow: [repo] } },
  plugins: [
    lovableShims(),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      router: { entry: path.relative(src, path.join(stubs, "router")) },
    }),
    react(),
  ],
});

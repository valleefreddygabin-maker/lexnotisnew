import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CookieConsentProvider } from "../components/CookieConsent";
import { ChatWidget } from "../components/ChatWidget";
import bgCathedrale from "../assets/cathedrale-mans.jpg.asset.json";
import bgVieuxMans from "../assets/vieux-mans.jpg.asset.json";
import bgRemparts from "../assets/remparts-mans.jpg.asset.json";

function LeMansBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* White base keeps the site background clean */}
      <div className="absolute inset-0 bg-background" />

      {/* Watermark photos of Le Mans landmarks — visible but not competing with content */}
      <div className="absolute top-0 left-0 w-[32vw] min-w-[200px] max-w-[460px] max-h-[36vh] overflow-hidden mask-fade-edges">
        <img
          src={bgCathedrale.url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80 saturate-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-vignette-fade" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[50%] bg-gradient-to-l from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="absolute top-0 right-0 w-[32vw] min-w-[200px] max-w-[460px] max-h-[36vh] overflow-hidden mask-fade-edges">
        <img
          src={bgVieuxMans.url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80 saturate-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-vignette-fade" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="absolute bottom-0 right-0 w-[32vw] min-w-[200px] max-w-[460px] max-h-[36vh] overflow-hidden mask-fade-edges">
        <img
          src={bgRemparts.url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80 saturate-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-vignette-fade" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-background via-background/30 to-transparent" />
      </div>

      {/* Light white veil to keep text legible over the watermark photos */}
      <div className="absolute inset-0 bg-background/20" />
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Erreur de chargement
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Essayez de recharger la page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-5 py-2.5 text-sm font-medium text-foreground"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
      { name: "google-site-verification", content: "ceMrEmGVjNt0mYByBLIUH_0TK0IlhzkOTcYz_NtFtYk" },
      { property: "og:site_name", content: "LexNotis" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8e24d86-5199-4aa3-b9f4-7cef755c5355/id-preview-e6ab04cd--d5003cd4-3728-49e0-97e3-48fc7624c700.lovable.app-1785744511905.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8e24d86-5199-4aa3-b9f4-7cef755c5355/id-preview-e6ab04cd--d5003cd4-3728-49e0-97e3-48fc7624c700.lovable.app-1785744511905.png" },
      { title: "LexNotis — L'intelligence au service de votre entreprise" },
      { property: "og:title", content: "LexNotis — L'intelligence au service de votre entreprise" },
      { name: "twitter:title", content: "LexNotis — L'intelligence au service de votre entreprise" },
      { name: "description", content: "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches, gagner du temps et accélérer votre entreprise." },
      { property: "og:description", content: "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches, gagner du temps et accélérer votre entreprise." },
      { name: "twitter:description", content: "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches, gagner du temps et accélérer votre entreprise." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LexNotis",
          url: "https://lexnotis.com",
          description:
            "Agence sarthoise qui conçoit des infrastructures IA sur-mesure pour automatiser les tâches des entreprises.",
          founders: [
            { "@type": "Person", name: "Hugo" },
            { "@type": "Person", name: "Clovis" },
            { "@type": "Person", name: "Gabin" },
          ],
          address: {
            "@type": "PostalAddress",
            addressRegion: "Sarthe",
            addressCountry: "FR",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LexNotis",
          url: "https://lexnotis.com",
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CookieConsentProvider>
        <Toaster />
        <LeMansBackdrop />
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </CookieConsentProvider>
    </QueryClientProvider>
  );
}





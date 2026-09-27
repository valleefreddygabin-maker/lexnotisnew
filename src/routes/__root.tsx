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
import { ArrowRight } from "lucide-react";
import { stagger } from "@/lib/motion";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CookieConsentProvider } from "../components/CookieConsent";
import { ChatWidget } from "../components/ChatWidget";

function NotFoundComponent() {
  return (
    <div className="container-page flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="type-label enter">Erreur 404</p>
      <h1 className="type-display enter mt-4 max-w-2xl" style={stagger(1)}>
        Cette page n'existe pas.
      </h1>
      <p className="type-lead enter mt-5 max-w-md" style={stagger(2)}>
        Elle a peut-être été déplacée. Revenez à l'accueil, on vous remet sur la bonne voie.
      </p>
      <div className="enter mt-8 flex flex-wrap gap-3" style={stagger(3)}>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil <ArrowRight size={16} />
        </Link>
        <Link to="/contact" className="btn btn-ghost">
          Nous contacter
        </Link>
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
    <div className="container-page flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="type-label">Erreur de chargement</p>
      <h1 className="type-h2 mt-4 max-w-xl">Une erreur est survenue.</h1>
      <p className="type-lead mt-4 max-w-md">Essayez de recharger la page.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn btn-primary"
        >
          Réessayer
        </button>
        <a href="/" className="btn btn-ghost">
          Accueil
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#fafafc" },
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
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </CookieConsentProvider>
    </QueryClientProvider>
  );
}





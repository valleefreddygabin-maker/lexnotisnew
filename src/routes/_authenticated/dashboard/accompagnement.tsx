import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/accompagnement")({
  head: () => ({
    meta: [
      { title: "Accompagnement — Espace client LexNotis" },
      {
        name: "description",
        content:
          "Contactez votre interlocuteur LexNotis dédié pour toute question sur vos agents, automatisations ou votre site web.",
      },
      { property: "og:title", content: "Accompagnement — Espace client LexNotis" },
      {
        property: "og:description",
        content: "Votre support dédié LexNotis, joignable par email ou message.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Accompagnement,
});

function Accompagnement() {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Accompagnement
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Support dédié
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Hugo, Clovis et Gabin vous répondent directement. Aucun ticket anonyme, un interlocuteur
        unique pour votre projet.
      </p>

      <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-violet/5 to-blue-accent/5 p-8">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <LifeBuoy className="h-5 w-5 text-violet" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Une question, un besoin ?</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Décrivez votre besoin : nouvelle automatisation, évolution d'un agent, mise à jour de
              votre site. Nous revenons vers vous sous 24 h ouvrées.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="mailto:contact@lexnotis.com"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                Écrire à notre équipe
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-black/5"
              >
                <MessageCircle className="h-4 w-4" />
                Formulaire de contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <Mail className="h-4 w-4 text-violet" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Email</h3>
          <p className="mt-1 text-sm text-muted-foreground">contact@lexnotis.com</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <Phone className="h-4 w-4 text-violet" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Échange visio</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sur demande, 30 minutes.</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <MessageCircle className="h-4 w-4 text-violet" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Délai de réponse</h3>
          <p className="mt-1 text-sm text-muted-foreground">Moins de 24 h ouvrées.</p>
        </div>
      </div>
    </div>
  );
}

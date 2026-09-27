import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/facture")({
  head: () => ({
    meta: [
      { title: "Facture — Espace client LexNotis" },
      {
        name: "description",
        content: "Consultez et téléchargez vos factures LexNotis.",
      },
      { property: "og:title", content: "Facture — Espace client LexNotis" },
      { property: "og:description", content: "Consultez et téléchargez vos factures LexNotis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Facture,
});

function Facture() {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Paiement
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Facture</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Votre historique de facturation et vos paiements.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="grid grid-cols-3 gap-4 border-b border-black/8 px-6 py-4 text-sm font-semibold text-muted-foreground">
          <span>Date</span>
          <span>Montant</span>
          <span>Statut</span>
        </div>
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          Aucune facture pour le moment.
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">Adresse de facturation</h3>
        <p className="mt-2 text-sm text-muted-foreground">Aucune adresse de facturation enregistrée.</p>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardStatus } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/dashboard/abonnement")({
  head: () => ({
    meta: [
      { title: "Abonnement — Espace client LexNotis" },
      {
        name: "description",
        content: "Gérez votre abonnement LexNotis et vos options de facturation.",
      },
      { property: "og:title", content: "Abonnement — Espace client LexNotis" },
      { property: "og:description", content: "Gérez votre abonnement LexNotis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Abonnement,
});

function Abonnement() {
  const fetchStatus = useServerFn(getDashboardStatus);
  const { data: status } = useQuery({
    queryKey: ["dashboard-status"],
    queryFn: () => fetchStatus(),
    retry: false,
  });

  const subscription = status?.subscription ?? null;
  const isActive = status?.hasActiveSubscription ?? false;
  const nextDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Mon compte
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Abonnement</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Gérez votre formule, vos options et votre renouvellement.
      </p>

      <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-violet/5 to-blue-accent/5 p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Formule actuelle</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isActive && subscription
                ? `${subscription.plan} — abonnement actif`
                : "Vous n'avez pas encore d'abonnement actif."}
            </p>
          </div>
          {!isActive && (
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Choisir un plan
            </a>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Prochaine échéance</h3>
          <p className="mt-2 text-sm text-muted-foreground">{nextDate}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Moyen de paiement</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {isActive ? "Prélèvement géré par LexNotis." : "Aucun moyen de paiement enregistré."}
          </p>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Check, LifeBuoy, Receipt, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardStatus } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Espace client LexNotis" },
      {
        name: "description",
        content:
          "Votre tableau de bord LexNotis : suivez vos projets d'automatisation et vos assistants IA sur-mesure.",
      },
      { property: "og:title", content: "Tableau de bord — Espace client LexNotis" },
      {
        property: "og:description",
        content: "Suivez vos projets d'automatisation LexNotis depuis votre espace client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const cardClass = "rounded-2xl border border-black/10 bg-white p-6 shadow-sm";

function ChecklistItem({
  done,
  label,
  actionLabel,
  to,
}: {
  done: boolean;
  label: string;
  actionLabel: string;
  to: string;
}) {
  return (
    <li className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-3">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
            done
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
              : "border-black/10 bg-white text-muted-foreground"
          }`}
        >
          {done ? <Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        </span>
        <span
          className={`text-sm ${done ? "text-muted-foreground line-through" : "font-medium text-foreground"}`}
        >
          {label}
        </span>
      </span>

      {!done && (
        <Link
          to={to as never}
          replace
          className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-foreground transition hover:bg-black/5"
        >
          {actionLabel}
        </Link>
      )}
    </li>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const fetchStatus = useServerFn(getDashboardStatus);
  const { data: status } = useQuery({
    queryKey: ["dashboard-status"],
    queryFn: () => fetchStatus(),
    retry: false,
  });

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const displayName =
    status?.displayName?.trim() ||
    (typeof metadata.company === "string" ? metadata.company.trim() : "") ||
    (typeof metadata.display_name === "string" ? metadata.display_name.trim() : "") ||
    (typeof metadata.full_name === "string" ? metadata.full_name.trim() : "") ||
    "";
  const firstName = displayName ? displayName.split(" ")[0] : "";

  const agentsCount = status?.agentsCount ?? 0;
  const invoicesCount = status?.invoicesCount ?? 0;
  const hasSubscription = status?.hasActiveSubscription ?? false;

  const steps = [
    {
      label: "Profil complété",
      done: Boolean(displayName),
      actionLabel: "Compléter",
      to: "/dashboard/profil",
    },
    {
      label: "Abonnement actif",
      done: hasSubscription,
      actionLabel: "Choisir un plan",
      to: "/dashboard/abonnement",
    },
    {
      label: "Premier agent configuré",
      done: agentsCount > 0,
      actionLabel: "Configurer",
      to: "/dashboard/agent",
    },
  ];

  const completed = steps.filter((s) => s.done).length;
  const onboardingDone = completed === steps.length;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {firstName ? (
          <>
            Bonjour <span className="text-gradient-brand">{firstName}</span>
          </>
        ) : (
          <>Bonjour 👋</>
        )}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Bienvenue dans votre espace client. Retrouvez à gauche l'ensemble de vos services et de votre
        accompagnement dédié.
      </p>

      {!onboardingDone && (
        <div className="mt-8 rounded-2xl border border-black/10 bg-gradient-to-br from-violet/5 to-blue-accent/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">Bien démarrer</h2>
            <span className="text-xs font-medium text-muted-foreground">
              {completed}/{steps.length} étapes
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet to-blue-accent transition-all"
              style={{ width: `${(completed / steps.length) * 100}%` }}
            />
          </div>
          <ul className="mt-2 divide-y divide-black/8">
            {steps.map((step) => (
              <ChecklistItem key={step.label} {...step} />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className={cardClass}>
          <CreditCard className="h-4 w-4 text-violet" />
          <h2 className="mt-3 text-sm font-semibold text-muted-foreground">Abonnement</h2>
          {hasSubscription ? (
            <p className="mt-1 text-2xl font-bold text-foreground">Actif</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-foreground">Aucun abonnement actif</p>
              <Link
                to="/dashboard/abonnement"
                replace
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-brand px-4 py-2 text-xs font-medium text-primary-foreground shadow-glow transition hover:scale-105"
              >
                Choisir un plan
              </Link>
            </>
          )}
        </div>

        <div className={cardClass}>
          <Bot className="h-4 w-4 text-violet" />
          <h2 className="mt-3 text-sm font-semibold text-muted-foreground">Agents IA</h2>
          {agentsCount > 0 ? (
            <p className="mt-1 text-2xl font-bold text-foreground">{agentsCount}</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-foreground">Vous n'avez pas encore d'agent IA</p>
              <Link
                to="/dashboard/agent"
                replace
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-brand px-4 py-2 text-xs font-medium text-primary-foreground shadow-glow transition hover:scale-105"
              >
                Créer mon premier agent
              </Link>
            </>
          )}
        </div>

        <div className={cardClass}>
          <Receipt className="h-4 w-4 text-violet" />
          <h2 className="mt-3 text-sm font-semibold text-muted-foreground">Factures</h2>
          {invoicesCount > 0 ? (
            <p className="mt-1 text-2xl font-bold text-foreground">{invoicesCount}</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-foreground">Aucune facture pour le moment</p>
              <Link
                to="/dashboard/facture"
                replace
                className="mt-4 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-foreground transition hover:bg-black/5"
              >
                Voir la facturation
              </Link>
            </>
          )}
        </div>

      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet/10 to-blue-accent/10">
            <LifeBuoy className="h-5 w-5 text-violet" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Besoin d'aide ?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Votre interlocuteur dédié LexNotis répond sous 24 h ouvrées.
            </p>
          </div>
        </div>
        <Link
          to="/dashboard/accompagnement"
          replace
          className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Contacter le support
        </Link>
      </div>
    </div>
  );
}

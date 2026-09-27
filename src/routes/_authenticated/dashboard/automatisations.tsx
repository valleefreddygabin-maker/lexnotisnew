import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/automatisations")({
  head: () => ({
    meta: [
      { title: "Automatisations — Espace client LexNotis" },
      {
        name: "description",
        content:
          "Suivez vos automatisations LexNotis, leur statut et demandez de nouveaux workflows sur-mesure.",
      },
      { property: "og:title", content: "Automatisations — Espace client LexNotis" },
      {
        property: "og:description",
        content: "Statut de vos automatisations et demandes de nouveaux workflows.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Automatisations,
});

type Status = "active" | "paused" | "error";

const statusStyles: Record<Status, { label: string; className: string; dot: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-700",
    dot: "bg-emerald-500",
  },
  paused: { label: "En pause", className: "bg-amber-500/10 text-amber-700", dot: "bg-amber-500" },
  error: {
    label: "En erreur",
    className: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};

const automations: { name: string; description: string; status: Status }[] = [];

function StatusBadge({ status }: { status: Status }) {
  const s = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${s.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function Automatisations() {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Mes solutions
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Automatisations
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Vos workflows automatisés, leur statut en temps réel et vos nouvelles demandes.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-black/8 px-6 py-4 sm:flex-row sm:items-center">
          <h2 className="text-sm font-semibold text-foreground">Automatisations en place</h2>
          <Link
            to="/dashboard/accompagnement"
            replace
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Demander une automatisation
          </Link>
        </div>

        {automations.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">
              Aucune automatisation active pour le moment
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Décrivez-nous une tâche répétitive de votre quotidien : nous la transformons en
              automatisation sur-mesure.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-black/8">
            {automations.map((a) => (
              <li
                key={a.name}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.description}</p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {(["active", "paused", "error"] as Status[]).map((status) => (
          <div key={status} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <StatusBadge status={status} />
            <p className="mt-3 text-2xl font-bold text-foreground">
              {automations.filter((a) => a.status === status).length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

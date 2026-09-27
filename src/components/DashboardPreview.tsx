import { Bot, CreditCard, LayoutDashboard, Receipt, Workflow } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", active: true },
  { icon: Bot, label: "Agents IA" },
  { icon: Workflow, label: "Automatisations" },
  { icon: CreditCard, label: "Abonnement" },
  { icon: Receipt, label: "Factures" },
];

const stats = [
  { label: "Heures gagnées", value: "142 h" },
  { label: "Agents actifs", value: "3" },
  { label: "Tâches automatisées", value: "1 284" },
];

const activity = [
  { label: "Devis n°2418 envoyé à Novatech", time: "il y a 2 min", done: true },
  { label: "12 emails triés et classés", time: "il y a 18 min", done: true },
  { label: "Relance client programmée (J+3)", time: "il y a 1 h", done: true },
  { label: "Rapport hebdo en préparation", time: "en cours", done: false },
];

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-brand opacity-10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
        {/* browser bar */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-secondary px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <div className="mx-auto rounded-full bg-white px-3 py-0.5 text-[10px] text-muted-foreground">
            lexnotis.com/dashboard
          </div>
        </div>

        <div className="flex">
          {/* sidebar */}
          <aside className="hidden w-44 shrink-0 border-r border-black/5 bg-secondary/60 p-3 sm:block">
            <div className="mb-4 flex items-center gap-2 px-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-brand text-[9px] font-bold text-primary-foreground">
                LN
              </div>
              <span className="text-xs font-semibold">LexNotis</span>
            </div>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li
                  key={n.label}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                    n.active
                      ? "bg-gradient-brand-soft font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </li>
              ))}
            </ul>
          </aside>

          {/* main */}
          <div className="flex-1 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gradient-brand">
              Vue d'ensemble
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight">Bonjour Clément 👋</h3>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-black/10 bg-white p-3">
                  <p className="text-lg font-bold tracking-tight text-gradient-brand">{s.value}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-black/10 p-3">
                <p className="mb-2 text-[11px] font-semibold">Activité récente</p>
                <ul className="space-y-2">
                  {activity.map((a) => (
                    <li key={a.label} className="flex items-start gap-2">
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                          a.done ? "bg-emerald-500" : "bg-violet animate-pulse"
                        }`}
                      />
                      <span className="text-[10px] leading-snug text-foreground">
                        {a.label}
                        <span className="ml-1 text-muted-foreground">· {a.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-black/10 p-3">
                <p className="mb-2 text-[11px] font-semibold">Temps gagné · 6 derniers mois</p>
                <div className="flex h-24 items-end gap-1.5">
                  {[28, 40, 34, 58, 72, 96].map((h, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-violet/40 to-blue-accent"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-[8px] text-muted-foreground">
                  {["M", "A", "M", "J", "J", "A"].map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

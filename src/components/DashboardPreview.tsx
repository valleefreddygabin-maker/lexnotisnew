import { Bot, CreditCard, LayoutDashboard, Receipt, Workflow } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", active: true },
  { icon: Bot, label: "Agents IA" },
  { icon: Workflow, label: "Automatisations" },
  { icon: CreditCard, label: "Abonnement" },
  { icon: Receipt, label: "Factures" },
];

const stats = [
  { label: "Heures gagnées", value: "142", unit: "h" },
  { label: "Agents actifs", value: "3" },
  { label: "Tâches automatisées", value: "1 284" },
];

const activity = [
  { label: "Devis n°2418 envoyé à Novatech", time: "il y a 2 min", done: true },
  { label: "12 emails triés et classés", time: "il y a 18 min", done: true },
  { label: "Relance client programmée (J+3)", time: "il y a 1 h", done: true },
  { label: "Rapport hebdo en préparation", time: "en cours", done: false },
];

const months = ["M", "A", "M", "J", "J", "A"];
const bars = [28, 40, 34, 58, 72, 96];

/**
 * Illustrative preview of the LexNotis client space (sample data).
 * Bars grow when the parent <Reveal> becomes visible.
 */
export function DashboardPreview() {
  return (
    <div className="surface-float overflow-hidden rounded-[22px] text-left">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <div className="mx-auto rounded-md bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground shadow-[0_0_0_1px_var(--border)]">
          lexnotis.com/dashboard
        </div>
        <span className="w-[42px]" />
      </div>

      <div className="flex">
        <aside className="hidden w-52 shrink-0 border-r border-border bg-secondary/40 p-3 md:block">
          <div className="mb-5 flex items-center gap-2 px-2 pt-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[9px] font-semibold text-white">
              LN
            </div>
            <span className="text-[13px] font-semibold tracking-[-0.01em]">LexNotis</span>
          </div>
          <ul className="space-y-0.5">
            {nav.map((n) => (
              <li
                key={n.label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                  n.active
                    ? "bg-card font-medium text-foreground shadow-[0_0_0_1px_var(--border)]"
                    : "text-muted-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" strokeWidth={1.75} />
                {n.label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 p-5 md:p-7">
          <p className="font-mono text-[11px] text-muted-foreground">Vue d'ensemble</p>
          <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">Bonjour Clément</h3>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-card p-3.5 shadow-[0_0_0_1px_var(--border)]"
              >
                <p className="text-[22px] font-semibold leading-none tracking-[-0.04em] tabular">
                  {s.value}
                  {s.unit && <span className="ml-0.5 text-[15px] text-muted-foreground">{s.unit}</span>}
                </p>
                <p className="mt-2 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 lg:grid-cols-5">
            <div className="rounded-xl bg-card p-4 shadow-[0_0_0_1px_var(--border)] lg:col-span-3">
              <p className="text-[12px] font-medium">Activité récente</p>
              <ul className="mt-3 space-y-2.5">
                {activity.map((a) => (
                  <li key={a.label} className="flex items-start gap-2.5">
                    <span
                      className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${
                        a.done ? "bg-emerald-500" : "bg-brand"
                      }`}
                    />
                    <span className="min-w-0 text-[12px] leading-snug">
                      {a.label}
                      <span className="ml-1.5 text-muted-foreground">{a.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-[0_0_0_1px_var(--border)] lg:col-span-2">
              <p className="text-[12px] font-medium">Temps gagné, 6 derniers mois</p>
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                  <div key={i} className="flex h-full flex-1 items-end">
                    <div
                      className={`w-full origin-bottom scale-y-[0.08] rounded-[5px] transition-transform duration-[900ms] ease-out [.is-visible_&]:scale-y-100 ${
                        i === bars.length - 1 ? "bg-brand" : "bg-brand/25"
                      }`}
                      style={{ height: `${h}%`, transitionDelay: `${300 + i * 60}ms` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
                {months.map((m, i) => (
                  <span key={i} className="flex-1 text-center">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

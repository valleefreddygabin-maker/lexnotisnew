import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { createAgent, listAgents } from "@/lib/dashboard.functions";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard/agent")({
  head: () => ({
    meta: [
      { title: "Agent — Espace client LexNotis" },
      {
        name: "description",
        content: "Créez et supervisez vos assistants IA LexNotis.",
      },
      { property: "og:title", content: "Agent — Espace client LexNotis" },
      { property: "og:description", content: "Créez et supervisez vos assistants IA LexNotis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Agent,
});

function Agent() {
  const queryClient = useQueryClient();
  const fetchAgents = useServerFn(listAgents);
  const addAgent = useServerFn(createAgent);
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: () => fetchAgents(),
    retry: false,
  });

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await addAgent({ data: { name: name.trim() } });
      setName("");
      await queryClient.invalidateQueries({ queryKey: ["agents"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-status"] });
      toast.success("Agent créé — étape validée dans votre checklist.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCount = agents.filter((a) => a.status === "active").length;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Automatisation
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Agent</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Vos assistants intelligents sur-mesure et leurs performances.
      </p>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Mes agents</h2>
        {agents.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">Vous n'avez pas encore créé d'agent.</p>
        ) : (
          <ul className="mt-4 divide-y divide-black/8">
            {agents.map((agent) => (
              <li key={agent.id} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-foreground">{agent.name}</span>
                <span className="rounded-full border border-violet/30 bg-violet/5 px-3 py-1 text-xs font-medium text-violet">
                  {agent.status === "active" ? "Actif" : "Brouillon"}
                </span>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleCreate} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de votre agent (ex. Assistant devis)"
            maxLength={80}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Créer un agent
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Agents actifs</h3>
          <p className="mt-2 text-2xl font-bold text-foreground">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Agents créés</h3>
          <p className="mt-2 text-2xl font-bold text-foreground">{agents.length}</p>
        </div>
      </div>
    </div>
  );
}

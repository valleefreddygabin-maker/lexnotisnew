import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save, User } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/profile.functions";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/dashboard/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — Espace client LexNotis" },
      {
        name: "description",
        content: "Consultez et modifiez vos informations personnelles LexNotis.",
      },
      { property: "og:title", content: "Mon profil — Espace client LexNotis" },
      { property: "og:description", content: "Consultez et modifiez vos informations personnelles LexNotis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["profile"],
      queryFn: () => getProfile(),
    });
    return {};
  },
  component: Profil,
});

function Profil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = user?.email ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile({ data: { display_name: displayName } });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-status"] });
      toast.success("Profil mis à jour — étape validée dans votre checklist.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        Mon compte
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Mon profil</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Consultez et modifiez vos informations sans avoir à vous reconnecter.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet/10 to-blue-accent/10">
                <User className="h-5 w-5 text-violet" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Informations personnelles</h2>
                <p className="text-sm text-muted-foreground">Modifiez le nom affiché sur votre espace.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input id="email" type="email" value={email} disabled className="bg-black/5" />
                <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié ici.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Nom affiché</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Votre nom ou pseudo"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                Retour au tableau de bord
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-brand text-primary-foreground hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enregistrement…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Compte</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre profil est lié à votre adresse email. Vous pouvez modifier votre nom affiché à tout moment.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Besoin d'aide ?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contactez-nous via la page contact ou envoyez-nous un message sur nos réseaux sociaux.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

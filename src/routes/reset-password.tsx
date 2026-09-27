import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { GradientButton } from "@/components/GradientButton";
import { PasswordInput } from "@/components/PasswordInput";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe — LexNotis" },
      {
        name: "description",
        content: "Choisissez un nouveau mot de passe pour votre espace client LexNotis.",
      },
      { property: "og:title", content: "Nouveau mot de passe — LexNotis" },
      {
        property: "og:description",
        content: "Réinitialisez le mot de passe de votre espace client LexNotis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reset-password" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/reset-password" }],
  }),
  component: ResetPassword,
});

const passwordSchema = z
  .string()
  .min(8, { message: "Au moins 8 caractères" })
  .max(72)
  .regex(/[A-Z]/, { message: "Au moins une majuscule" })
  .regex(/[0-9]/, { message: "Au moins un chiffre" });

/** Lit une éventuelle erreur renvoyée par le lien email (hash ou query). */
function readLinkError(): string | null {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search);
  const description = hash.get("error_description") ?? query.get("error_description");
  const code = hash.get("error_code") ?? query.get("error_code");
  if (!description && !code) return null;
  if ((code ?? "").includes("expired") || (description ?? "").toLowerCase().includes("expired")) {
    return "Ce lien de réinitialisation a expiré. Demandez-en un nouveau.";
  }
  return description ?? "Ce lien de réinitialisation n'est plus valide.";
}

/** Traduit les erreurs Supabase renvoyées lors de la mise à jour du mot de passe. */
function translateUpdateError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("weak") || m.includes("pwned") || m.includes("easy to guess")) {
    return "Ce mot de passe est trop courant et figure dans des fuites de données. Choisissez-en un plus original (évitez les mots du dictionnaire et les suites simples).";
  }
  if (m.includes("same")) return "Choisissez un mot de passe différent de l'ancien.";
  if (m.includes("should be at least") || m.includes("at least 6")) {
    return "Mot de passe trop court : 8 caractères minimum.";
  }
  if (m.includes("session") || m.includes("jwt") || m.includes("token")) {
    return "Votre lien de réinitialisation a expiré. Demandez un nouveau lien puis réessayez.";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  }
  return `Impossible d'enregistrer le mot de passe : ${message}`;
}

function ResetPassword() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;

    const linkError = readLinkError();
    if (linkError) {
      setError(linkError);
      setStatus("invalid");
      return;
    }

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || session) setStatus("ready");
    });

    void (async () => {
      // Le client Supabase consomme le lien (hash ou code PKCE) au chargement ;
      // on laisse un court délai avant de conclure.
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (data.session) {
          setStatus("ready");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      if (mounted) {
        setError("Lien de réinitialisation manquant ou expiré. Demandez un nouveau lien.");
        setStatus("invalid");
      }
    })();

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    if (parsed.data !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: parsed.data });
    setLoading(false);
    if (updateError) {
      setError(translateUpdateError(updateError.message));
      return;
    }

    setDone(true);
    setTimeout(() => void navigate({ to: "/dashboard", replace: true }), 1500);
  }

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight">
          Nouveau <span className="text-gradient-brand">mot de passe</span>
        </h1>

        {status === "checking" && (
          <div className="flex items-center justify-center gap-2 rounded-3xl border border-black/10 bg-card/60 p-8 text-sm text-muted-foreground backdrop-blur-xl">
            <Loader2 size={16} className="animate-spin" />
            Vérification du lien…
          </div>
        )}

        {status === "invalid" && (
          <div className="space-y-4 rounded-3xl border border-black/10 bg-card/60 p-7 text-center backdrop-blur-xl">
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
            <Link
              to="/mot-de-passe-oublie"
              className="inline-block rounded-xl border border-black/10 bg-black/5 px-4 py-2 text-xs font-medium transition hover:bg-black/10"
            >
              Demander un nouveau lien
            </Link>
          </div>
        )}

        {status === "ready" && (
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-3xl border border-black/10 bg-card/60 p-7 backdrop-blur-xl"
          >
            <p className="flex items-start gap-2 rounded-xl border border-black/10 bg-gradient-brand-soft px-3 py-2 text-xs text-foreground">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" />
              Lien vérifié. Choisissez un mot de passe de 8 caractères minimum, avec une majuscule et
              un chiffre.
            </p>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Nouveau mot de passe
              </span>
              <PasswordInput
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
                label="le nouveau mot de passe"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Confirmer le mot de passe
              </span>
              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
                label="la confirmation"
              />
            </label>

            {error && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}
            {done && (
              <p className="rounded-xl border border-black/10 bg-gradient-brand-soft px-3 py-2 text-xs">
                Mot de passe mis à jour. Redirection vers votre espace…
              </p>
            )}

            <GradientButton type="submit" disabled={loading || done} className="!w-full">
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Enregistrer"}
            </GradientButton>
          </form>
        )}
      </div>
    </div>
  );
}

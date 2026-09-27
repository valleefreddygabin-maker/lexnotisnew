import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Mail, MailCheck } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { GradientButton } from "@/components/GradientButton";

export const Route = createFileRoute("/mot-de-passe-oublie")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mot de passe oublié — LexNotis" },
      {
        name: "description",
        content:
          "Recevez un lien sécurisé par email pour réinitialiser le mot de passe de votre espace client LexNotis.",
      },
      { property: "og:title", content: "Mot de passe oublié — LexNotis" },
      {
        property: "og:description",
        content: "Réinitialisez en quelques secondes l'accès à votre espace client LexNotis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mot-de-passe-oublie" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/mot-de-passe-oublie" }],
  }),
  component: ForgotPassword,
});

const emailSchema = z.string().trim().email({ message: "Adresse email invalide" }).max(255);

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function sendLink(target: string) {
    setLoading(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(target, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(
        resetError.message.toLowerCase().includes("rate")
          ? "Trop de demandes en peu de temps. Patientez quelques minutes avant de réessayer."
          : resetError.message,
      );
      return;
    }
    setSentTo(target);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    await sendLink(parsed.data);
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
            Espace client
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Mot de passe <span className="text-gradient-brand">oublié</span>
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            Entrez votre adresse email : nous vous envoyons un lien sécurisé pour choisir un nouveau
            mot de passe.
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-card/60 p-7 backdrop-blur-xl md:p-8">
          {sentTo ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand-soft">
                <MailCheck size={22} className="text-brand" />
              </div>
              <p className="text-sm text-foreground">
                Email envoyé à <strong>{sentTo}</strong>.
              </p>
              <p className="text-xs text-muted-foreground">
                Ouvrez le lien depuis cet appareil pour définir votre nouveau mot de passe. Le lien
                expire après 1 heure. Pensez à vérifier vos spams.
              </p>
              <button
                type="button"
                onClick={() => void sendLink(sentTo)}
                disabled={loading}
                className="w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-black/10 disabled:opacity-50"
              >
                {loading ? "Envoi en cours…" : "Renvoyer le lien"}
              </button>
              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}
              <Link
                to="/connexion"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline transition hover:text-foreground"
              >
                <ArrowLeft size={13} />
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Email
                </span>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    placeholder="vous@entreprise.fr"
                    className="w-full rounded-xl border border-black/10 bg-background/70 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-ring/40"
                  />
                </div>
              </label>

              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              <GradientButton type="submit" disabled={loading} className="!w-full">
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Envoyer le lien
                    <ArrowRight size={16} />
                  </>
                )}
              </GradientButton>

              <p className="text-center text-xs text-muted-foreground">
                <Link to="/connexion" className="underline transition hover:text-foreground">
                  Retour à la connexion
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

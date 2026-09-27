import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Mail, Shield, User, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { GradientButton } from "@/components/GradientButton";
import { setRememberPreference, useAuth } from "@/hooks/useAuth";
import { PasswordInput } from "@/components/PasswordInput";
import { hasAccountOnDevice, markAccountCreated } from "@/lib/account-state";


const PASSWORD_MIN_LENGTH = 8;

interface PasswordCriteria {
  label: string;
  met: boolean;
}

export const Route = createFileRoute("/connexion")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Connexion — Espace client LexNotis" },
      {
        name: "description",
        content:
          "Connectez-vous à votre espace LexNotis pour suivre vos projets d'automatisation et vos assistants IA sur-mesure.",
      },
      { property: "og:title", content: "Connexion — Espace client LexNotis" },
      {
        property: "og:description",
        content: "Accédez à votre espace client LexNotis en quelques secondes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/connexion" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/connexion" }],
  }),
  component: Connexion,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Adresse email invalide" }).max(255),
  password: z.string().min(6, { message: "6 caractères minimum" }).max(72),
  confirmPassword: z.string().max(72).optional(),
  displayName: z.string().trim().max(80).optional(),
});

const signupPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, { message: `Au moins ${PASSWORD_MIN_LENGTH} caractères` })
  .regex(/[A-Z]/, { message: "Au moins une majuscule" })
  .regex(/[0-9]/, { message: "Au moins un chiffre" });

const signupSchema = z
  .object({
    email: z.string().trim().email({ message: "Adresse email invalide" }).max(255),
    password: signupPasswordSchema,
    confirmPassword: z.string().min(1, { message: "Confirmez votre mot de passe" }),
    displayName: z.string().trim().max(80).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

function getPasswordStrength(password: string): { score: number; criteria: PasswordCriteria[]; label: string; color: string } {
  const criteria: PasswordCriteria[] = [
    { label: `Au moins ${PASSWORD_MIN_LENGTH} caractères`, met: password.length >= PASSWORD_MIN_LENGTH },
    { label: "Au moins une majuscule", met: /[A-Z]/.test(password) },
    { label: "Au moins un chiffre", met: /[0-9]/.test(password) },
  ];
  const score = criteria.filter((c) => c.met).length;
  let label = "Faible";
  let color = "bg-red-500";
  if (score === 2) {
    label = "Moyen";
    color = "bg-amber-500";
  } else if (score === 3) {
    label = "Fort";
    color = "bg-emerald-500";
  }
  return { score, criteria, label, color };
}

function PasswordStrength({ password }: { password: string }) {
  const { score, criteria, label, color } = useMemo(() => getPasswordStrength(password), [password]);
  if (!password) return null;
  return (
    <div className="space-y-2 rounded-xl border border-black/10 bg-black/[0.02] p-3">
      <div className="flex items-center gap-2">
        <Shield size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Force : {label}</span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < score ? color : "bg-black/10"}`}
          />
        ))}
      </div>
      <ul className="space-y-1">
        {criteria.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            {c.met ? (
              <Check size={12} className="text-emerald-500" />
            ) : (
              <X size={12} className="text-red-400" />
            )}
            <span className={c.met ? "text-foreground" : ""}>{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connexion() {
  const navigate = useNavigate();
  const { session } = useAuth();
  // Nouveau visiteur (aucun compte sur cet appareil) → formulaire d'inscription par défaut.
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!hasAccountOnDevice()) setMode("signup");
  }, []);

  useEffect(() => {
    if (mode === "signin") setConfirmPassword("");
  }, [mode]);

  useEffect(() => {
    if (session) {
      markAccountCreated();
      void navigate({ to: "/dashboard", replace: true });
    }
  }, [session, navigate]);


  async function resendConfirmation() {
    if (!pendingEmail) return;
    setResending(true);
    setError(null);
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: pendingEmail,
      options: { emailRedirectTo: `${window.location.origin}/connexion` },
    });
    setResending(false);
    if (resendError) setError(resendError.message);
    else setInfo(`Nouvel email de confirmation envoyé à ${pendingEmail}.`);
  }


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const activeSchema = mode === "signup" ? signupSchema : schema;
    const parsed = activeSchema.safeParse({ email, password, confirmPassword, displayName });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/connexion`,
            data: { display_name: parsed.data.displayName || null },
          },
        });
        if (signUpError) throw signUpError;
        setRememberPreference(remember);
        // Inscription finalisée : le header affichera « Se connecter » désormais.
        markAccountCreated();
        if (!data.session) {
          setPendingEmail(parsed.data.email);
          // Supabase renvoie un "succès" sans email lorsqu'un compte existe déjà
          // (protection anti-énumération) : identities est alors vide.
          const alreadyExists = (data.user?.identities?.length ?? 0) === 0;
          setInfo(
            alreadyExists
              ? `Un compte existe déjà pour ${parsed.data.email} et aucun nouvel email n'a été envoyé. Utilisez « Renvoyer l'email de confirmation » ci-dessous.`
              : `Compte créé ! Un email de confirmation vient d'être envoyé à ${parsed.data.email}. Pas d'email reçu d'ici quelques minutes ? Utilisez « Renvoyer l'email de confirmation » ci-dessous.`,
          );
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInError) throw signInError;
        setRememberPreference(remember);
        markAccountCreated();
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("Email not confirmed")) {
        setPendingEmail(parsed.data.email);
        setError("Votre adresse n'est pas encore confirmée. Vérifiez votre boîte mail.");
      } else {
        setError(
          message.includes("Invalid login credentials")
            ? "Email ou mot de passe incorrect."
            : message || "Une erreur est survenue.",
        );
      }
    } finally {

      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    setRememberPreference(remember);
    const result = await lovable.auth.signInWithOAuth("google", {
      // Route publique : une fois la session hydratée, l'effet ci-dessus
      // redirige vers /dashboard.
      redirect_uri: `${window.location.origin}/connexion`,
    });
    if (result.error) {
      setError("La connexion Google a échoué.");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    // Flux popup (preview) : la session est déjà posée, on n'attend pas l'effet.
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      void navigate({ to: "/dashboard", replace: true });
      return;
    }
    setLoading(false);
  }




  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="type-label mb-4">
            Espace client
          </p>
          <h1 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[44px]">
            {mode === "signin" ? (
              <>
                Bon retour sur <span className="text-gradient-brand">LexNotis</span>
              </>
            ) : (
              <>
                Créer votre <span className="text-gradient-brand">compte</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            {mode === "signin"
              ? "Connectez-vous pour retrouver vos projets et gagner du temps."
              : "Quelques secondes suffisent pour ouvrir votre espace."}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-card/60 p-7 backdrop-blur-xl md:p-8">
          <p className="mb-4 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setInfo(null);
              }}
              className="font-semibold text-foreground underline"
            >
              {mode === "signin" ? "Créer un compte" : "Se connecter"}
            </button>
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Nom d'affichage
                </span>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={80}
                    placeholder="Hugo Dupont"
                    className="w-full rounded-xl border border-black/10 bg-background/70 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-ring/40"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</span>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  placeholder="vous@entreprise.fr"
                  className="w-full rounded-xl border border-black/10 bg-background/70 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Mot de passe
              </span>
              <PasswordInput
                value={password}
                onChange={setPassword}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </label>

            {mode === "signup" && <PasswordStrength password={password} />}

            {mode === "signup" && (
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
            )}

            <div className="flex items-center justify-between gap-3 pt-1">
              <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-black/20 accent-[oklch(0.55_0.24_295)]"
                />
                Se souvenir de moi
              </label>
              {mode === "signin" && (
                <Link
                  to="/mot-de-passe-oublie"
                  className="text-xs text-muted-foreground underline transition hover:text-foreground"
                >
                  Mot de passe oublié ?
                </Link>
              )}

            </div>

            {error && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}
            {info && (
              <p className="rounded-xl border border-black/10 bg-gradient-brand-soft px-3 py-2 text-xs text-foreground">
                {info}
              </p>
            )}
            {pendingEmail && (
              <button
                type="button"
                onClick={resendConfirmation}
                disabled={resending}
                className="w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-black/10 disabled:opacity-50"
              >
                {resending ? "Envoi en cours…" : "Renvoyer l'email de confirmation"}
              </button>
            )}


            <GradientButton type="submit" disabled={loading} className="!w-full">
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Se connecter" : "Créer mon compte"}
                  <ArrowRight size={16} />
                </>
              )}
            </GradientButton>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-black/10" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="btn btn-ghost w-full"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.7z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.3 7.3 0 0 1-11-3.8H1v3.1A12 12 0 0 0 12 24z"
              />
              <path fill="#FBBC05" d="M5 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1a12 12 0 0 0 0 10.8l4-3.1z" />
              <path
                fill="#EA4335"
                d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z"
              />
            </svg>
            Continuer avec Google
          </button>

        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/contact" className="underline transition hover:text-foreground">
            Besoin d'aide ? Contactez-nous
          </Link>
        </p>
      </div>
    </div>
  );
}

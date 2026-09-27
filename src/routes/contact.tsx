import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { submitContact } from "@/lib/contact.functions";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Parlons de votre projet | LexNotis" },
      {
        name: "description",
        content:
          "Décrivez votre projet en quelques mots. On vous répond sous 24h avec un premier échange offert.",
      },
      { property: "og:title", content: "Contactez LexNotis" },
      {
        property: "og:description",
        content: "Un premier échange offert pour explorer votre projet IA sur-mesure.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const clientSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Sujet requis").max(200),
  message: z.string().trim().min(10, "Décrivez un peu plus votre projet (min. 10 caractères)").max(2000),
});

function ContactPage() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const result = clientSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await send({ data: result.data });
      setStatus("success");
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.",
      );
    }
  }

  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand animate-fade-in">
            Contact
          </p>
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight md:text-6xl">
            Parlons de <span className="text-gradient-brand animate-gradient">votre projet</span>
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "150ms" }}
          >
            Décrivez votre besoin en quelques lignes. On vous répond sous 24h avec des
            premières pistes concrètes.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-6">
              <div className="rounded-3xl border border-black/10 bg-card/50 p-8 backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Un premier échange offert</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  30 minutes pour comprendre votre contexte et identifier les leviers
                  prioritaires. Sans engagement.
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-card/50 p-8 backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Une réponse sur-mesure</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pas de template. On étudie votre demande et on revient vers vous avec
                  une proposition réfléchie.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-black/10 bg-card/60 p-8 backdrop-blur-xl md:p-10"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="animate-fade-up mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
                    <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Message envoyé !</h3>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Merci pour votre message. On revient vers vous très vite —
                    généralement sous 24h ouvrées.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm text-gradient-brand hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Nom" error={errors.name}>
                      <input
                        value={form.name}
                        onChange={update("name")}
                        maxLength={100}
                        className={inputCls}
                        placeholder="Votre nom"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        maxLength={255}
                        className={inputCls}
                        placeholder="vous@entreprise.com"
                      />
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field label="Entreprise" optional error={errors.company}>
                      <input
                        value={form.company}
                        onChange={update("company")}
                        maxLength={120}
                        className={inputCls}
                        placeholder="Nom de votre entreprise"
                      />
                    </Field>
                    <Field label="Sujet" error={errors.subject}>
                      <input
                        value={form.subject}
                        onChange={update("subject")}
                        maxLength={200}
                        className={inputCls}
                        placeholder="Automatisation, IA, refonte…"
                      />
                    </Field>
                  </div>

                  <Field label="Votre message" error={errors.message} className="mt-5">
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      maxLength={2000}
                      rows={6}
                      className={`${inputCls} resize-none`}
                      placeholder="Décrivez brièvement votre entreprise et ce que vous aimeriez transformer."
                    />
                  </Field>

                  {status === "error" && (
                    <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_70px_-15px_oklch(0.62_0.22_290/0.7)] active:scale-[0.99] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      "Envoi en cours…"
                    ) : (
                      <>
                        Envoyer mon message
                        <Send size={16} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring/40";

function Field({
  label,
  children,
  error,
  optional,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {optional && <span className="text-[10px] normal-case tracking-normal text-muted-foreground/60">(optionnel)</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive-foreground">{error}</span>}
    </label>
  );
}

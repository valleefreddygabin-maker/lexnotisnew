import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Mail, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { submitContact } from "@/lib/contact.functions";
import { stagger } from "@/lib/motion";

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
    <div className="container-page pb-8 pt-14 md:pt-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="type-label enter">Contact</p>
            <h1 className="type-display enter mt-5" style={stagger(1)}>
              Parlons de <span className="text-brand">votre projet.</span>
            </h1>
            <p className="type-lead enter mt-6 max-w-md" style={stagger(2)}>
              Décrivez votre besoin en quelques lignes. On vous répond sous 24h avec des premières
              pistes concrètes.
            </p>

            <ul className="enter mt-10 space-y-6" style={stagger(3)}>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Mail size={18} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[16px] font-medium tracking-[-0.01em]">
                    Un premier échange offert
                  </span>
                  <span className="mt-1 block max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                    30 minutes pour comprendre votre contexte et identifier les leviers
                    prioritaires. Sans engagement.
                  </span>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Sparkles size={18} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[16px] font-medium tracking-[-0.01em]">
                    Une réponse sur-mesure
                  </span>
                  <span className="mt-1 block max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                    Pas de template. On étudie votre demande et on revient vers vous avec une
                    proposition réfléchie.
                  </span>
                </span>
              </li>
            </ul>

            <p className="enter mt-10 text-[15px] text-muted-foreground" style={stagger(4)}>
              Vous préférez l'email ?{" "}
              <a href="mailto:contact@lexnotis.com" className="link-underline font-medium text-foreground">
                contact@lexnotis.com
              </a>
            </p>
          </div>
        </div>

        <div className="enter lg:col-span-7" style={stagger(2)}>
          <form onSubmit={onSubmit} noValidate className="surface p-6 sm:p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-start py-10" aria-live="polite">
                <div className="animate-fade-up mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <CheckCircle2 size={24} strokeWidth={1.75} />
                </div>
                <h2 className="type-h2">Message envoyé.</h2>
                <p className="type-lead mt-4 max-w-md">
                  Merci pour votre message. On revient vers vous très vite, généralement sous 24h
                  ouvrées.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn btn-ghost mt-8"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nom" error={errors.name} htmlFor="contact-name">
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      maxLength={100}
                      aria-invalid={!!errors.name}
                      className={inputCls}
                      placeholder="Votre nom"
                    />
                  </Field>
                  <Field label="Email" error={errors.email} htmlFor="contact-email">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={update("email")}
                      maxLength={255}
                      aria-invalid={!!errors.email}
                      className={inputCls}
                      placeholder="vous@entreprise.com"
                    />
                  </Field>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field label="Entreprise" optional error={errors.company} htmlFor="contact-company">
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={update("company")}
                      maxLength={120}
                      className={inputCls}
                      placeholder="Nom de votre entreprise"
                    />
                  </Field>
                  <Field label="Sujet" error={errors.subject} htmlFor="contact-subject">
                    <input
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={update("subject")}
                      maxLength={200}
                      aria-invalid={!!errors.subject}
                      className={inputCls}
                      placeholder="Automatisation, IA, refonte…"
                    />
                  </Field>
                </div>

                <Field
                  label="Votre message"
                  error={errors.message}
                  htmlFor="contact-message"
                  className="mt-5"
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={update("message")}
                    maxLength={2000}
                    rows={6}
                    aria-invalid={!!errors.message}
                    className={`${inputCls} h-auto resize-none py-3 leading-relaxed`}
                    placeholder="Décrivez brièvement votre entreprise et ce que vous aimeriez transformer."
                  />
                </Field>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive-foreground"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary mt-8 h-12 w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer mon message <Send size={15} className="btn-arrow" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl bg-background px-4 text-[16px] text-foreground shadow-[inset_0_0_0_1px_var(--input)] outline-none transition-shadow duration-150 placeholder:text-muted-foreground focus:shadow-[inset_0_0_0_1px_var(--ring),0_0_0_4px_oklch(0.52_0.215_289/0.12)] aria-[invalid=true]:shadow-[inset_0_0_0_1px_var(--destructive)] md:text-[15px]";

function Field({
  label,
  children,
  error,
  optional,
  htmlFor,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
  htmlFor: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-[14px] font-medium">
        {label}
        {optional && <span className="text-[13px] font-normal text-muted-foreground">(optionnel)</span>}
      </label>
      {children}
      {error && <span className="text-[13px] text-destructive-foreground">{error}</span>}
    </div>
  );
}

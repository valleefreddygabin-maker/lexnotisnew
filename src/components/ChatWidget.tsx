import { useEffect, useRef, useState } from "react";
import { ArrowUp, CalendarDays, FileText, Mail, Sparkles, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";
import { cn } from "@/lib/utils";

const AVATAR_SRC = "/images/chat-avatar.jpg";

const QUICK_ACTIONS = [
  { icon: FileText, label: "Demander un devis" },
  { icon: Mail, label: "Nous contacter" },
  { icon: Sparkles, label: "Découvrir vos services" },
  { icon: CalendarDays, label: "Prendre rendez-vous" },
] as const;

type Msg = { from: "bot" | "user"; text: string };

const INITIAL_MESSAGE: Msg = {
  from: "bot",
  text: "Bonjour ! Bienvenue chez LexNotis. Comment puis-je vous aider aujourd'hui ?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const askBot = useServerFn(sendChatMessage);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 180);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setShowQuickActions(false);
    setTyping(true);

    try {
      const { reply } = await askBot({ data: { message: text } });
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Une erreur est survenue. Merci de réessayer dans un instant." },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end md:bottom-5 md:right-5">
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le chat avec Valentin"
        aria-expanded={open}
        className={cn(
          "group flex items-center gap-2.5 rounded-full bg-foreground p-1.5 text-background shadow-[0_0_0_1px_oklch(1_0_0/0.16),var(--shadow-float)] transition-[transform,opacity] duration-200 ease-out active:scale-[0.97] md:pr-4",
          open ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <span className="relative block h-9 w-9 shrink-0">
          <img
            src={AVATAR_SRC}
            alt=""
            className="h-full w-full rounded-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-foreground" />
        </span>
        <span className="hidden text-[14px] font-medium md:inline">Discutez avec Valentin</span>
      </button>

      {/* Window: scales from the launcher's corner (origin-aware) */}
      <div
        role="dialog"
        aria-label="Chat avec Valentin, conseiller LexNotis"
        aria-hidden={!open}
        className={cn(
          "absolute bottom-0 right-0 flex h-[min(600px,calc(100dvh-2rem))] w-[min(392px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-[24px] bg-card shadow-[0_0_0_1px_var(--border),var(--shadow-float)]",
          open
            ? "visible scale-100 opacity-100 transition-[transform,opacity] duration-[240ms] ease-out"
            : "invisible scale-[0.96] opacity-0 transition-[transform,opacity,visibility] duration-150 ease-out",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <img
                src={AVATAR_SRC}
                alt="Valentin, conseiller LexNotis"
                className="h-full w-full rounded-full object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">Valentin</p>
              <p className="text-[13px] text-muted-foreground">Conseiller en ligne</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le chat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary hover:text-foreground active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          aria-live="polite"
          className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain bg-background px-4 py-4"
        >
          {messages.map((m, i) =>
            m.from === "bot" ? (
              <div
                key={i}
                className="max-w-[86%] origin-bottom-left animate-[message-pop_280ms_var(--ease-out)_both] self-start rounded-[18px] rounded-bl-[6px] bg-card px-3.5 py-2.5 text-[14px] leading-[1.45] shadow-[0_0_0_1px_var(--border)] [overflow-wrap:anywhere]"
              >
                {m.text}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[86%] origin-bottom-right animate-[message-pop_280ms_var(--ease-out)_both] self-end rounded-[18px] rounded-br-[6px] bg-brand px-3.5 py-2.5 text-[14px] leading-[1.45] text-white [overflow-wrap:anywhere]"
              >
                {m.text}
              </div>
            ),
          )}

          {showQuickActions && (
            <div className="mt-1 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => send(label)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-[13px] font-medium text-foreground shadow-[0_0_0_1px_var(--border)] transition-[background-color,transform] duration-150 ease-out hover:bg-brand-soft active:scale-[0.97]"
                >
                  <Icon size={14} className="text-brand" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {typing && (
            <div className="flex w-fit origin-bottom-left animate-[message-pop_200ms_var(--ease-out)_both] items-center gap-1 self-start rounded-[18px] rounded-bl-[6px] bg-card px-3.5 py-3 shadow-[0_0_0_1px_var(--border)]">
              {[0, 160, 320].map((delay) => (
                <span
                  key={delay}
                  className="block h-1.5 w-1.5 animate-[typing-bounce_1.2s_ease-in-out_infinite] rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <label htmlFor="chat-input" className="sr-only">
            Votre message
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={typing}
            placeholder="Écrivez votre message…"
            className="h-11 flex-1 rounded-full bg-secondary px-4 text-[16px] outline-none transition-shadow duration-150 placeholder:text-muted-foreground focus:shadow-[0_0_0_2px_var(--ring)] disabled:opacity-60 md:text-[14px]"
          />
          <button
            type="submit"
            aria-label="Envoyer"
            disabled={!input.trim() || typing}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-[opacity,transform] duration-150 ease-out active:scale-95 disabled:opacity-30"
          >
            <ArrowUp size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

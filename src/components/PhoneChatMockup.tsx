import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Plus, Video } from "lucide-react";

type Msg = { from: "user" | "bot"; text: string; time: string };

const conversation: Msg[] = [
  {
    from: "user",
    text: "Envoie un devis à Clément (clement@novatech.fr) pour la prestation de mars.",
    time: "11:02",
  },
  {
    from: "bot",
    text: "C'est fait. Devis n°2418 généré depuis votre modèle et envoyé à Clément par email.",
    time: "11:02",
  },
  {
    from: "user",
    text: "Tu peux aussi lui proposer un point demain à 18h ?",
    time: "11:03",
  },
  {
    from: "bot",
    text: "Invitation envoyée : demain 18h00 (Paris). J'ai ajouté le devis en pièce jointe et créé la relance à J+3.",
    time: "11:03",
  },
];

/** Police système Apple (SF Pro) pour un rendu iOS authentique. */
const IOS_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

function SignalBars() {
  return (
    <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4.5}
          y={9 - i * 2.6}
          width="3"
          height={3 + i * 2.6}
          rx="1"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor" aria-hidden>
      <path d="M8 10.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z" />
      <path
        d="M4.6 6.6a4.9 4.9 0 0 1 6.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2.2 4.1a8.3 8.3 0 0 1 11.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg viewBox="0 0 27 13" className="h-[12px] w-[25px]" aria-hidden>
      <rect
        x="0.6"
        y="0.6"
        width="23"
        height="11.8"
        rx="3.4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.1"
      />
      <rect x="2.2" y="2.2" width="16.5" height="8.6" rx="2.2" fill="currentColor" />
      <path
        d="M25.4 4.6v3.8c.9-.3 1.4-1 1.4-1.9s-.5-1.6-1.4-1.9Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}

interface Props {
  /** Fade the bottom of the phone into the page (for inline sections). */
  fade?: boolean;
  className?: string;
}

export function PhoneChatMockup({ fade = false, className = "" }: Props) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
  );
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setTime(
          new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        ),
      15000,
    );
    return () => clearInterval(timer);
  }, []);

  // Play the conversation once: user messages appear, the agent "types" before each reply.
  useEffect(() => {
    if (!started || visible >= conversation.length) return;
    const isBot = conversation[visible].from === "bot";
    if (isBot) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisible((v) => v + 1);
      }, 1300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 500 : 1100);
    return () => clearTimeout(t);
  }, [started, visible]);

  const lastUserIndex = conversation
    .slice(0, visible)
    .reduce((acc, m, i) => (m.from === "user" ? i : acc), -1);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-[280px] sm:w-[308px] ${className}`}
      style={{ fontFamily: IOS_FONT }}
    >
      <div
        className="relative rounded-[3rem] bg-[oklch(0.18_0.012_286)] p-[9px] shadow-[inset_0_0_0_1px_oklch(1_0_0/0.14),0_0_0_1px_oklch(0.2_0.02_286/0.2),0_30px_80px_-24px_oklch(0.2_0.05_289/0.45),0_12px_24px_-12px_oklch(0.2_0.02_286/0.3)]"
        style={
          fade
            ? {
                maskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
              }
            : undefined
        }
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[9px] z-30 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-[oklch(0.18_0.012_286)]" />

          {/* Barre d'état iOS */}
          <div className="relative z-20 flex h-[44px] items-center justify-between px-[22px] pt-[6px] text-black">
            <span className="w-[54px] text-[14px] font-semibold tracking-[-0.2px] tabular-nums">
              {time}
            </span>
            <div className="flex items-center gap-[5px]">
              <SignalBars />
              <WifiGlyph />
              <BatteryGlyph />
            </div>
          </div>

          {/* En-tête de conversation iOS */}
          <div className="relative flex items-center border-b border-black/10 bg-[rgba(247,247,247,0.94)] px-3 pb-2 pt-1 backdrop-blur-xl">
            <button
              type="button"
              aria-label="Retour"
              className="flex items-center text-[#007AFF]"
              tabIndex={-1}
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
            </button>
            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-primary-foreground">
                LN
              </div>
              <p className="mt-0.5 text-[11px] font-medium leading-tight tracking-[-0.1px] text-black">
                Agent LexNotis
              </p>
            </div>
            <Video className="h-5 w-5 text-[#007AFF]" />
          </div>

          {/* Fil de messages */}
          <div className="flex h-[380px] flex-col gap-1.5 overflow-hidden bg-white px-3 py-3">
            <p className="mx-auto pb-1 text-[10px] font-medium text-[#8E8E93]">
              <span className="font-semibold text-[#3C3C43]">aujourd&apos;hui</span> {time}
            </p>
            {conversation.slice(0, visible).map((m, i) => (
              <div
                key={i}
                className={`message-in ${m.from === "user" ? "message-in-user" : "message-in-bot"}`}
              >
                <div
                  className={`max-w-[80%] px-[13px] py-[7px] text-[13px] leading-[1.3] tracking-[-0.1px] ${
                    m.from === "user"
                      ? "ml-auto rounded-[19px] bg-brand text-primary-foreground"
                      : "mr-auto rounded-[19px] bg-[#E9E9EB] text-black"
                  }`}
                >
                  {m.text}
                </div>
                {m.from === "user" && i === lastUserIndex && (
                  <p className="mt-0.5 pr-1 text-right text-[9px] font-medium text-[#8E8E93]">
                    Distribué
                  </p>
                )}
              </div>
            ))}
            {typing && (
              <div className="message-in message-in-bot mr-auto flex items-center gap-1 rounded-[19px] bg-[#E9E9EB] px-4 py-3">
                {[0, 160, 320].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-[typing-bounce_1.2s_ease-in-out_infinite] rounded-full bg-[#8E8E93]"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Barre de saisie iMessage */}
          <div className="flex items-center gap-2 border-t border-black/10 bg-[rgba(247,247,247,0.94)] px-3 py-2 backdrop-blur-xl">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9E9EB] text-[#3C3C43]">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <div className="flex flex-1 items-center justify-between rounded-full border border-black/15 py-[5px] pl-3 pr-1">
              <span className="text-[12px] tracking-[-0.1px] text-[#8E8E93]">iMessage</span>
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" aria-hidden>
                  <path
                    d="M12 5v14M12 5l-5 5M12 5l5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Indicateur d'accueil */}
          <div className="flex justify-center bg-[rgba(247,247,247,0.94)] pb-1.5">
            <div className="h-[4px] w-[110px] rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";

const AVATAR_SRC = "/images/chat-avatar.jpg";


const QUICK_ACTIONS = [
  "📝 Demander un devis",
  "✉️ Nous contacter",
  "🚀 Découvrir vos services",
  "📅 Prendre rendez-vous",
] as const;

type Msg = { from: "bot" | "user"; text: string };

const INITIAL_MESSAGE: Msg = {
  from: "bot",
  text: "Bonjour ! Bienvenue chez Lexnotis. Comment puis-je vous aider aujourd'hui ?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const askBot = useServerFn(sendChatMessage);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

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
        {
          from: "bot",
          text: "Une erreur est survenue. Merci de réessayer dans un instant.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }


  return (
    <div
      className="fixed bottom-[16px] right-[16px] z-[9999] flex flex-col items-end"
      style={{ fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Bouton d'ouverture */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le chat"
        className={`flex items-center gap-2 rounded-full bg-gradient-brand px-[clamp(12px,1vw,18px)] py-[clamp(8px,0.7vw,12px)] text-[clamp(12px,0.95vw,14px)] font-semibold text-white shadow-glow transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-[2px] hover:shadow-[0_20px_50px_-12px_oklch(0.62_0.22_290/0.7)] ${
          open ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <MessageCircle className="h-[clamp(14px,1.1vw,18px)] w-[clamp(14px,1.1vw,18px)] animate-[pulse-icon_2s_infinite]" />
        Discutez avec Valentin
      </button>

      {/* Fenêtre de chat */}
      <div
        className={`absolute bottom-0 right-0 flex h-[clamp(400px,58vh,620px)] w-[clamp(300px,24vw,440px)] max-h-[calc(100vh-32px)] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[20px] border border-[#edf2f7] bg-[#fdfdfd] shadow-[0_12px_30px_rgba(0,0,0,0.13)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-brand px-[clamp(12px,1.1vw,18px)] py-[clamp(10px,0.9vw,14px)] text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative inline-block h-[clamp(30px,2.4vw,40px)] w-[clamp(30px,2.4vw,40px)]">
              <img
                src={AVATAR_SRC}
                alt="Valentin, conseiller LexNotis"
                className="h-full w-full rounded-full bg-white object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <span className="absolute bottom-[1px] right-0 h-[clamp(7px,0.6vw,10px)] w-[clamp(7px,0.6vw,10px)] rounded-full border border-white/60 bg-[#48bb78]" />
            </div>
            <div className="flex flex-col">
              <p className="m-0 text-[clamp(14px,1.25vw,17px)] font-bold tracking-[0.2px]">Valentin</p>
              <p className="mt-0 text-[clamp(10px,0.85vw,12px)] font-normal text-[#f0e6ff]">
                Conseiller en ligne
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le chat"
            className="flex h-[clamp(26px,2vw,30px)] w-[clamp(26px,2vw,30px)] items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
          >
            <X className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#f8fafc] px-[clamp(10px,0.95vw,14px)] py-[clamp(12px,1.05vw,16px)] [&::-webkit-scrollbar-thumb]:rounded-[8px] [&::-webkit-scrollbar-thumb]:bg-[#cbd5e0] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-[5px]"
        >
          {messages.map((m, i) =>
            m.from === "bot" ? (
              <div
                key={i}
                className="flex max-w-[90%] animate-[message-pop_0.4s_cubic-bezier(0.25,1,0.5,1)_forwards] items-end gap-2 self-start"
              >
                <img
                  src={AVATAR_SRC}
                  alt=""
                  className="h-[clamp(16px,1.4vw,22px)] w-[clamp(16px,1.4vw,22px)] shrink-0 rounded-full border border-[#e2e8f0] object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
                <div className="w-full rounded-[16px] rounded-bl-[4px] border border-[#edf2f7] bg-white px-[clamp(10px,0.9vw,14px)] py-[clamp(8px,0.7vw,12px)] text-[clamp(12px,1vw,14px)] leading-[1.45] text-[#2d3748] shadow-[0_1px_4px_rgba(0,0,0,0.04)] [word-wrap:break-word]">
                  {m.text}
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[85%] animate-[message-pop_0.4s_cubic-bezier(0.25,1,0.5,1)_forwards] self-end rounded-[16px] rounded-br-[4px] bg-[#8c40ff] px-[clamp(10px,0.9vw,14px)] py-[clamp(8px,0.7vw,12px)] text-[clamp(12px,1vw,14px)] leading-[1.45] text-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] [word-wrap:break-word]"
              >
                {m.text}
              </div>
            ),
          )}

          {showQuickActions && (
            <div className="ml-[clamp(22px,1.9vw,28px)] mt-1 flex animate-[message-pop_0.6s_cubic-bezier(0.25,1,0.5,1)_forwards] flex-col items-start gap-[clamp(6px,0.55vw,10px)]">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => send(action)}
                  className="flex items-center gap-1.5 rounded-[16px] border border-[#8c40ff] bg-white px-[clamp(10px,0.9vw,14px)] py-[clamp(6px,0.55vw,10px)] text-[clamp(11px,0.9vw,13px)] font-semibold text-[#8c40ff] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#8c40ff] hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {typing && (
            <div className="flex animate-[message-pop_0.3s_forwards] items-end gap-2 self-start">
              <img
                src={AVATAR_SRC}
                alt=""
                className="h-[clamp(16px,1.4vw,22px)] w-[clamp(16px,1.4vw,22px)] shrink-0 rounded-full border border-[#e2e8f0] object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="flex w-fit items-center gap-1 rounded-[16px] rounded-bl-[4px] border border-[#edf2f7] bg-white px-[clamp(10px,0.9vw,14px)] py-[clamp(8px,0.7vw,12px)]">
                {[-0.32, -0.16, 0].map((delay) => (
                  <span
                    key={delay}
                    className="block h-[clamp(4px,0.4vw,6px)] w-[clamp(4px,0.4vw,6px)] animate-[typing-bounce_1.4s_infinite_ease-in-out_both] rounded-full bg-[#a0aec0]"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center border-t border-[#f0f2f5] bg-white px-[clamp(10px,0.95vw,14px)] py-[clamp(10px,0.9vw,14px)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative flex w-full items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-[20px] border border-[#e2e8f0] bg-[#f8fafc] py-[clamp(8px,0.7vw,12px)] pl-4 pr-[clamp(36px,3vw,46px)] text-[clamp(12px,1vw,14px)] outline-none transition-all duration-200 focus:border-[#8c40ff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(140,64,255,0.15)] disabled:cursor-not-allowed disabled:bg-[#f1f5f9]"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className={`absolute right-2 flex h-[clamp(26px,2vw,32px)] w-[clamp(26px,2vw,32px)] items-center justify-center rounded-full bg-[#8c40ff] text-white transition-colors duration-200 hover:bg-[#712bcc] ${
                input.trim() ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Send className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

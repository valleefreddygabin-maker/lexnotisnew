import * as React from "react";
import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { Cookie, ChevronRight, X, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  COOKIE_CATEGORIES,
  type CookieCategory,
  type CookieConsent,
  getStoredConsent,
  saveConsent,
  hasConsentFor,
} from "@/lib/cookies";

interface CookieConsentContextValue {
  open: () => void;
  hasConsent: (category: CookieCategory) => boolean;
  consent: CookieConsent | null;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return value;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);
    if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const open = useCallback(() => {
    const stored = getStoredConsent();
    const current = stored ?? {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    setDraft(current);
    setShowBanner(true);
    setShowPreferences(true);
  }, []);

  const close = useCallback(() => {
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const acceptAll = useCallback(() => {
    const next: CookieConsent = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(next);
    setConsent(next);
    close();
  }, [close]);

  const rejectAll = useCallback(() => {
    const next: CookieConsent = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(next);
    setConsent(next);
    close();
  }, [close]);

  const saveCustom = useCallback(() => {
    if (!draft) return;
    const next: CookieConsent = { ...draft, timestamp: new Date().toISOString() };
    saveConsent(next);
    setConsent(next);
    close();
  }, [draft, close]);

  const toggleCategory = useCallback((id: CookieCategory) => {
    setDraft((prev) => {
      if (!prev || id === "necessary") return prev;
      return { ...prev, [id]: !prev[id] };
    });
  }, []);

  const hasConsent = useCallback(
    (category: CookieCategory) => hasConsentFor(category),
    [consent],
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CookieConsentContext.Provider value={{ open, hasConsent, consent }}>
      {children}

      {showBanner && (
        <div className="fixed bottom-0 left-0 z-[55] p-4 sm:p-5">
          <div className="animate-fade-up w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-[22px] bg-card/95 shadow-[0_0_0_1px_var(--border),var(--shadow-float)] backdrop-blur-xl">
            {!showPreferences ? (
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                    <Cookie className="h-4 w-4 text-brand" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">Votre vie privée</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Cookies utilisés pour la connexion et l’analyse anonyme. Choisissez ce que vous
                      acceptez.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={acceptAll} className="btn btn-ink btn-sm w-full">
                    <Check className="h-4 w-4" />
                    Tout accepter
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={rejectAll}
                      className="btn btn-ghost btn-sm"
                    >
                      Tout refuser
                    </button>
                    <button
                      onClick={() => {
                        const stored = getStoredConsent();
                        setDraft(
                          stored ?? {
                            necessary: true,
                            preferences: false,
                            analytics: false,
                            marketing: false,
                            timestamp: new Date().toISOString(),
                          },
                        );
                        setShowPreferences(true);
                      }}
                      className="btn btn-ghost btn-sm gap-0.5"
                    >
                      Personnaliser
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex max-h-[70vh] flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft">
                      <ShieldCheck className="h-4 w-4 text-brand" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Personnaliser</h3>
                      <p className="text-xs text-muted-foreground">Modifiez vos choix à tout moment.</p>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Fermer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2 overflow-y-auto pr-1">
                  {COOKIE_CATEGORIES.map((cat) => {
                    const value = draft?.[cat.id] ?? false;
                    return (
                      <div
                        key={cat.id}
                        className={cn(
                          "flex items-start justify-between gap-3 rounded-xl border p-3 transition",
                          value && cat.id !== "necessary"
                            ? "border-brand/30 bg-brand-soft/60"
                            : "border-border bg-card",
                        )}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{cat.title}</span>
                            {cat.required && (
                              <span className="rounded-full bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                Obligatoire
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{cat.description}</p>
                        </div>
                        <Switch
                          checked={value}
                          disabled={cat.required}
                          onCheckedChange={() => toggleCategory(cat.id)}
                          aria-label={cat.title}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <button onClick={saveCustom} className="btn btn-ink btn-sm w-full">
                    Enregistrer mes choix
                  </button>
                  <button onClick={rejectAll} className="btn btn-ghost btn-sm w-full">
                    Tout refuser
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

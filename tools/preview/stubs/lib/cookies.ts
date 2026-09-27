export type CookieCategory = "necessary" | "preferences" | "analytics" | "marketing";
export interface CookieConsent {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}
export const COOKIE_CATEGORIES: { id: CookieCategory; title: string; description: string; required?: boolean }[] = [
  { id: "necessary", title: "Nécessaires", description: "Indispensables au fonctionnement du site.", required: true },
  { id: "preferences", title: "Préférences", description: "Mémorisent vos choix d'affichage." },
  { id: "analytics", title: "Mesure d'audience", description: "Statistiques anonymes de fréquentation." },
  { id: "marketing", title: "Marketing", description: "Personnalisation des contenus." },
];
const KEY = "lexnotis_cookie_consent";
export function getStoredConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}
export function saveConsent(c: CookieConsent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
}
export function hasConsentFor(cat: CookieCategory) {
  return !!getStoredConsent()?.[cat];
}

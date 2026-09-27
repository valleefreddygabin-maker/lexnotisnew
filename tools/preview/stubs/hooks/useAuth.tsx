// Preview stub: nobody is signed in.
export function useAuth() {
  return { session: null, user: null, loading: false } as {
    session: null | { user: { id: string; email?: string } };
    user: null | { id: string; email?: string; user_metadata?: Record<string, unknown> };
    loading: boolean;
  };
}
export function setRememberPreference(_remember: boolean) {}

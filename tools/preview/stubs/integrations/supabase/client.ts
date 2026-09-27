// Preview stub of the Supabase client (auth only).
const ok = async () => ({ data: { session: null, user: null }, error: null });
export const supabase = {
  auth: {
    getSession: ok,
    signOut: async () => ({ error: null }),
    updateUser: ok,
    resend: ok,
    signUp: ok,
    signInWithPassword: async () => ({ data: { session: null, user: null }, error: { message: "Aperçu local : connexion désactivée" } }),
    resetPasswordForEmail: ok,
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
  },
} as any;

export async function getProfile() {
  return { display_name: "" } as { display_name: string | null };
}
export async function updateProfile(_args: { data: unknown }) {
  return { ok: true };
}

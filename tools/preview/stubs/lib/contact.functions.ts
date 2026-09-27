export async function submitContact(_args: { data: unknown }) {
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}

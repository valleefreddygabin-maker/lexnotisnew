export async function sendChatMessage({ data }: { data: { message: string } }) {
  await new Promise((r) => setTimeout(r, 900));
  return { reply: `(aperçu local) Vous avez écrit : « ${data.message} ». Un conseiller vous répondra très vite.` };
}

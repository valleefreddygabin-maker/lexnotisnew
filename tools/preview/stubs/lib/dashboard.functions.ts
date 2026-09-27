// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
export async function getDashboardStatus(): Promise<Any> {
  return { plan: null, hoursSaved: 0, agents: 0 };
}
export async function listAgents(): Promise<Any[]> {
  return [];
}
export async function createAgent(_args: { data: unknown }): Promise<Any> {
  return { ok: true };
}

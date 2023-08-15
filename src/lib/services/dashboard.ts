import { Simulation } from '@/types/dashboard';

export async function postSimulation(o2CmdStr: string, version: string) {
  const response: Response = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify({ o2CmdStr, version }) });
  const simulation: Simulation = await response.json();

  return simulation;
}

export async function putSimulation(unresolvedSimulation: Simulation) {
  const response: Response = await fetch('/api/dashboard', { method: 'PUT', body: JSON.stringify(unresolvedSimulation) });
  const resolvedSimulation: Simulation = await response.json();

  return resolvedSimulation;
}

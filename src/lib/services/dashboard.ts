import { Simulation } from '@/types/dashboard';

export async function postSimulation(parsedO2Cmd: string) {
  const response: Response = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify(parsedO2Cmd) });
  const simulation: Simulation = await response.json();

  return simulation;
}

export async function putSimulation(unresolvedSimulation: Simulation) {
  const response: Response = await fetch('/api/dashboard', { method: 'PUT', body: JSON.stringify(unresolvedSimulation) });
  const resolvedSimulation: Simulation = await response.json();

  return resolvedSimulation;
}

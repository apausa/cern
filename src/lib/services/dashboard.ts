import { BashScript } from '@/types/build';
import { Simulation } from '@/types/dashboard';

export async function postSimulation(buildState: BashScript) {
  const response: Response = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify(buildState) });
  const simulation: Simulation = await response.json();

  return simulation;
}

export async function putSimulation(unresolvedSimulation: Simulation) {
  const response: Response = await fetch('/api/dashboard', { method: 'PUT', body: JSON.stringify(unresolvedSimulation) });
  const resolvedSimulation: Simulation = await response.json();

  return resolvedSimulation;
}

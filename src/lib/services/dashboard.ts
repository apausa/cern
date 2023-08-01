import { BashScript } from '@/types/build';
import { Simulation } from '@/types/dashboard';

export async function createSimulation(buildState: BashScript) {
  const response: Response = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify(buildState) });
  const simulation: Simulation = await response.json();

  return simulation;
}

export async function updateSimulation(simulation: Simulation) {
  const response: Response = await fetch('/api/dashboard', { method: 'PUT', body: JSON.stringify(simulation) });
  const promise: Simulation = await response.json();

  return promise;
}

export async function readAllSimulations() { // @develop
  const { body }: any = await fetch('/api/dashboard', { method: 'GET' });

  return body;
}

export async function deleteSimulation(simulation: any) { // @develop
  const { body }: any = await fetch('/api/dashboard', { method: 'DELETE', body: JSON.stringify(simulation) });

  return body;
}

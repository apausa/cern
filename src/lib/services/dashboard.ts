import { BashScript } from '@/types/build';

export async function createSimulation(buildState: BashScript) {
  const response: any = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify(buildState) });
  const simulation: any = await response.json();

  return simulation;
}

export async function updateSimulation(simulation: any) {
  const response: any = await fetch('/api/dashboard', { method: 'PUT', body: JSON.stringify(simulation) });
  const promise: any = await response.json();

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

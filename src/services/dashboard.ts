import { BashScript } from '@/types/build';

export async function createSimulation(buildState: BashScript) {
  const response: any = await fetch('/api/dashboard', { method: 'POST', body: JSON.stringify(buildState) });
  const simulation: any = await response.json();

  return simulation;
}

export async function readAllSimulations() { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'GET' });

  return body;
}

export async function updateSimulation(simulation: any) { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'PUT', body: JSON.stringify(simulation) });

  return body;
}

export async function deleteSimulation(simulation: any) { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'DELETE', body: JSON.stringify(simulation) });

  return body;
}

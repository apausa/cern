import actionConstants from '../constants/dashboardConstants';

export async function createSimulation(dispatch: any, buildState: any) {
  const response: any = await fetch('/api/simulation', { method: 'POST', body: JSON.stringify(buildState) });
  const simulation: any = await response.json();

  dispatch({ type: actionConstants.CREATE_SIMULATION, simulation });
}

export async function readAllSimulations() { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'GET' });

  return { type: actionConstants.READ_ALL_SIMULATIONS, body };
}

export async function updateSimulation(simulation: any) { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'PUT', body: JSON.stringify(simulation) });

  return { type: actionConstants.UPDATE_SIMULATION, body };
}

export async function deleteSimulation(simulation: any) { // @next
  const { body }: any = await fetch('/api/simulation', { method: 'DELETE', body: JSON.stringify(simulation) });

  return { type: actionConstants.DELETE_SIMULATION, body };
}

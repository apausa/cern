import actionConstants from '../constants/dashboardConstants';

export async function createSimulation(simulation: any) {
  console.log('action simulation', simulation);

  // const argumentsArray = Object.keys(argumentsObject).map(((entry) => argumentsObject[entry]));
  // const config = { command, argumentsArray };
  // const { data }: any = await fetch('/api/spawn',
  // { method: 'POST', body: JSON.stringify(simulation) });

  // return { type: actionConstants.CREATE_SIMULATION, data };
}

export async function readAllSimulations() {
  const { data }: any = await fetch('/api/spawn', { method: 'GET' });

  return { type: actionConstants.READ_ALL_SIMULATIONS, data };
}

export async function updateSimulation(simulation: any) { // @next
  const { data }: any = await fetch('/api/spawn', { method: 'PUT', body: JSON.stringify(simulation) });

  return { type: actionConstants.UPDATE_SIMULATION, data };
}

export async function deleteSimulation(simulation: any) { // @next
  const { data }: any = await fetch('/api/spawn', { method: 'DELETE', body: JSON.stringify(simulation) });

  return { type: actionConstants.DELETE_SIMULATION, data };
}

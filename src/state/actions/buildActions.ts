import actionConstants from '../constants/buildConstants';

export async function createSimulation(simulation: any) {
  // const argumentsArray = Object.keys(argumentsObject).map(((entry) => argumentsObject[entry]));
  // const config = { command, argumentsArray };
  const { data }: any = await fetch('/api/spawn', { method: 'POST', body: JSON.stringify(simulation) });

  return { type: actionConstants.CREATE_SIMULATION, data };
}

export function updateSimulation() {
  return null;
}

import { Simulation, SimulationAction } from '@/_types/components/simulationTypes';

const simulationReducer = (
  simulations: Simulation[],
  action: SimulationAction,
): Simulation[] => {
  let nextState = null;

  switch (action.type) {
    case 'READ_ALL_SIMULATIONS': {
      nextState = action.simulations;
      break; }
    case 'CREATE_SIMULATION': {
      nextState = [action.simulation, ...simulations];
      break; }
    case 'UPDATE_SIMULATION': { nextState = simulations.map((simulation: Simulation): Simulation => (
      (simulation.id === action.simulation.id) ? action.simulation : simulation)); break; }
    default: {
      nextState = simulations;
      break; }
  }

  localStorage.setItem('simulations', JSON.stringify(nextState));

  return nextState;
};

export default simulationReducer;

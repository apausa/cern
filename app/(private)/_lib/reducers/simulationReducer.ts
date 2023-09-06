import { Simulation, SimulationAction } from '@/(private)/_types/components/simulationTypes';
import { setAllSimulations } from '@/(private)/_utils/localStorage';

const simulationReducer = (
  currentState: Simulation[],
  action: SimulationAction,
): Simulation[] => {
  let nextState = null;

  switch (action.type) {
    case 'READ_ALL_SIMULATIONS': {
      nextState = action.simulations;
      break; }
    case 'CREATE_SIMULATION': {
      nextState = [action.simulation, ...action.simulations];
      break; }
    case 'UPDATE_SIMULATION': {
      nextState = currentState.map((simulation: Simulation): Simulation => (
        (simulation.id === action.simulation.id) ? action.simulation : simulation));
      break; }
    default: {
      nextState = currentState;
      break; }
  }

  setAllSimulations(nextState);
  return nextState;
};

export default simulationReducer;

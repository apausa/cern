import { Simulation, SimulationActionCreators } from '@/(private)/_types/components/simulationTypes';
import { getAllSimulations } from '@/(private)/_utils/localStorage';

const simulationActionCreators: SimulationActionCreators = {
  readAllSimulations: (dispatch) => {
    const simulations: Simulation[] | [] = getAllSimulations();

    dispatch({ type: 'READ_ALL_SIMULATIONS', simulations });
  },

  createSimulation: async (dispatch, form) => {
    const response: Response = await fetch('/api/simulation', { method: 'POST', body: JSON.stringify(form) });
    const simulation: Simulation | null = await response.json();

    if (simulation) dispatch({ type: 'CREATE_SIMULATION', simulation });
  },

  updateSimulationTestStatus: (dispatch, simulation, status) => {
    const unresolvedSimulation: Simulation = {
      ...simulation,
      testScript: { ...simulation.testScript, scriptStatus: status },
    };

    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });
  },

  updateSimulationGridStatus: (dispatch, simulation, status) => {
    const unresolvedSimulation: Simulation = {
      ...simulation,
      gridScript: { ...simulation.gridScript, scriptStatus: status },
    };

    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });
  },

  executeSimulationInTest: async (dispatch, unresolvedSimulation) => {
    const response: Response = await fetch('/api/simulation/test', { method: 'PUT', body: JSON.stringify(unresolvedSimulation) });
    const resolvedSimulation: Simulation | null = await response.json();

    if (resolvedSimulation) dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  },

  executeSimulationInGrid: async (dispatch, unresolvedSimulation) => {
    const response: Response = await fetch('/api/simulation/grid', { method: 'PUT', body: JSON.stringify(unresolvedSimulation) });
    const resolvedSimulation: Simulation | null = await response.json();

    if (resolvedSimulation) dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  },
};

export default simulationActionCreators;

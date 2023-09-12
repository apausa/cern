import { Simulation, SimulationActionCreators } from '@/_private/types/lib/simulationTypes';
import { getAllSimulations } from '@/_private/utils/localStorage';
import { API_GRID_RUN_WORKFLOW, API_LOCAL_CREATE_WORKFLOW, API_LOCAL_RUN_WORKFLOW } from '../constants/apiConstants';

const simulationActionCreators: SimulationActionCreators = {
  readAllSimulations: (dispatch) => {
    const simulations: Simulation[] | [] = getAllSimulations();

    dispatch({ type: 'READ_ALL_SIMULATIONS', simulations });
  },

  createSimulation: async (dispatch, form) => {
    const response: Response = await fetch(
      '/api/simulation',
      { method: 'POST', body: JSON.stringify(form) },
    );
    const simulation: Simulation | null = await response.json();

    if (simulation) dispatch({ type: 'CREATE_SIMULATION', simulation });
  },

  updateSimulationScriptStatus: (dispatch, simulation, script, status) => {
    const unresolvedSimulation: Simulation = {
      ...simulation,
      scripts: {
        ...simulation.scripts,
        [script]: { ...simulation.scripts[script], scriptStatus: status },
      },
    };

    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });
  },

  runSimulationScript: async (dispatch, simulation, script) => {
    const getRoute = () => {
      switch (script) {
        case 'localRunWorkflow': return API_LOCAL_RUN_WORKFLOW;
        case 'localCreateWorkflow': return API_LOCAL_CREATE_WORKFLOW;
        case 'gridRunWorkflow': return API_GRID_RUN_WORKFLOW;
        default: return '';
      }
    };

    const unresolvedSimulation: Response = await fetch(
      getRoute(),
      { method: 'PUT', body: JSON.stringify(simulation) },
    );
    const resolvedSimulation: Simulation = await unresolvedSimulation.json();
    dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  },
};

export default simulationActionCreators;

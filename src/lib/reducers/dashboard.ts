import { DashboardActions, DashboardState, Simulation } from '@/types/dashboard';

const dashboardReducer = (
  currentState: DashboardState,
  action: DashboardActions,
): DashboardState => {
  let nextState: DashboardState = currentState;

  switch (action.type) {
    case 'CREATE_SIMULATION': { nextState = [...currentState, action.simulation]; break; }
    case 'UPDATE_SIMULATION': { nextState = currentState.map((simulation: Simulation): Simulation => (
      (simulation.id === action.simulation.id) ? action.simulation : simulation)); break; }
    default: break;
  }

  return nextState;
};

export default dashboardReducer;

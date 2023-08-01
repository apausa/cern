import { DashboardState, Simulation } from '@/types/dashboard';

export default function dashboardReducer(currentState: DashboardState, action: any): any {
  let nextState: DashboardState = currentState;

  switch (action.type) {
    case 'CREATE_SIMULATION':
      nextState = [...currentState, action.simulation];
      break;
    case 'UPDATE_SIMULATION': {
      nextState = currentState.map((simulation: Simulation): Simulation => (
        (simulation === action.simulation) ? { ...simulation, ...action.simulation } : simulation));
      break;
    }
    default: break;
  }

  return nextState;
}

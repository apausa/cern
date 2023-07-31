import { DashboardAction } from '@/types/dashboard';

export default function dashboardReducer(currentState: any, action: DashboardAction) {
  let nextState = currentState;

  switch (action.type) {
    case 'CREATE_SIMULATION':
      nextState = [...nextState, action.simulation];
      break;
    case 'READ_ALL_SIMULATIONS': break; // @develop
    case 'UPDATE_SIMULATION': {
      nextState = nextState.map();
      break;
    }
    case 'DELETE_SIMULATION': break; // @develop
    default: break;
  }

  return nextState;
}

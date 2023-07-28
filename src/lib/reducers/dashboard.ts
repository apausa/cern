import DashboardAction from '@/types/components/dashboard/dashboard';

export default function dashboardReducer(currentState: any, action: DashboardAction) {
  let nextState = currentState;

  switch (action.type) {
    case 'CREATE_SIMULATION':
      nextState = [...nextState, action.simulation];
      break;
    case 'READ_ALL_SIMULATIONS': break; // @next
    case 'UPDATE_SIMULATION': break; // @next
    case 'DELETE_SIMULATION': break; // @next
    default: break;
  }

  return nextState;
}

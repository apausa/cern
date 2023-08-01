export default function dashboardReducer(currentState: any, action: any) {
  let nextState: any = null;

  switch (action.type) {
    case 'CREATE_SIMULATION':
      nextState = [...currentState, action.simulation];
      break;
    case 'READ_ALL_SIMULATIONS': break; // @develop
    case 'UPDATE_SIMULATION': {
      nextState = currentState.map((simulation: any) => ((simulation === action.simulation)
        ? { ...simulation, ...action.simulation } : simulation));
      break;
    }
    case 'DELETE_SIMULATION': break; // @develop
    default: break;
  }

  return nextState;
}

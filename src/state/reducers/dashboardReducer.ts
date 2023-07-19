import dashboardConstants from '../constants/dashboardConstants';

export default function dashboardReducer(currentState: any, action: any) {
  let nextState = currentState;

  switch (action.type) {
    case dashboardConstants.CREATE_SIMULATION:
      nextState = [...nextState, action.simulation];
      break;
    case dashboardConstants.READ_ALL_SIMULATIONS: break; // @next
    case dashboardConstants.UPDATE_SIMULATION: break; // @next
    case dashboardConstants.DELETE_SIMULATION: break; // @next
    default: break;
  }

  return nextState;
}

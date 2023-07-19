import dashboardConstants from '../constants/dashboardConstants';

export default function dashboardReducer(currentState: any, action: any) {
  let nextState = currentState;

  switch (action.type) {
    case dashboardConstants.CREATE_SIMULATION:
      nextState = [...nextState, action.data];
      break;
    case dashboardConstants.UPDATE_SIMULATION:
      break;
    default:
      break;
  }

  return nextState;
}

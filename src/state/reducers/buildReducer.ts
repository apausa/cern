import buildConstants from '../constants/buildConstants';

export default function buildReducer(currentState: any, action: any) {
  let nextState = currentState;

  switch (action.type) {
    case buildConstants.CREATE_SIMULATION:
      nextState = [...nextState, action.data];
      break;
    case buildConstants.UPDATE_SIMULATION:
      break;
    default:
      break;
  }

  return nextState;
}

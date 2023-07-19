import { buildConstants } from '../constants/buildConstants';

export default function buildReducer(currentState: any, action: any) {
  const nextState = currentState;

  switch (action.type) {
    case buildConstants.CHECK_INPUT:
      break;
    default:
      break;
  }

  return nextState;
}

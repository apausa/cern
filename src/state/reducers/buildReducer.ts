import { buildConstants } from '../constants/buildConstants';

export default function buildReducer(currentState: any, action: any) {
  const nextState = currentState;

  switch (action.type) {
    case buildConstants.UPDATE_INPUT: {
      const { event: { target: { name, value } } } = action;
      nextState.arguments[+name].status = value;
      break;
    }
    default:
      break;
  }

  return nextState;
}

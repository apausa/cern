import { buildConstants } from '../constants/buildConstants';

export default function buildReducer(currentState: any, action: any) {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case buildConstants.UPDATE_INPUT: {
      const { event: { target: { name } } } = action;
      nextState.arguments[+name].status = !nextState.arguments[+name].status;
      break;
    }
    default:
      break;
  }

  return nextState;
}

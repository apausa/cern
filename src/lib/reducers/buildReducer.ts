import { buildConstants } from '../constants/buildConstants';

export default function buildReducer(currentState: any, action: any) {
  // Deep copy to force 'Build' component to refresh, find a better alternative
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case buildConstants.UPDATE_INPUT: {
      const { event: { target: { name } } } = action;
      nextState.clientArgs[+name].status = !nextState.clientArgs[+name].status;
      break;
    }
    default: break;
  }

  return nextState;
}

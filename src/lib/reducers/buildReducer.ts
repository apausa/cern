import { BashScript, BuildAction } from '@/types/buildTypes';

export default function buildReducer(currentState: BashScript, action: BuildAction) {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case 'UPDATE_INPUT_CHECKBOX': {
      const { event: { target: { name } } } = action;
      nextState.clientArgs[+name].status = !nextState.clientArgs[+name].status;

      break; }
    case 'UPDATE_INPUT_RADIO': {
      break; }
    case 'UPDATE_INPUT_NUMBER': {
      break; }
    default: break;
  }

  return nextState;
}

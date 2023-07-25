/* eslint-disable no-param-reassign */

import {
  BashScript, BashScriptCmds, BuildReducerAction,
} from '@/types/dashboard/build';

export default function buildReducer(currentState: BashScript, action: BuildReducerAction) {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case 'UPDATE_INPUT_CHECKBOX': {
      const { event: { target: { name } } } = action;

      nextState.forEach((cmd: BashScriptCmds) => {
        cmd.args.forEach((arg: any) => {
          if (arg.title === name) arg.isChecked = !arg.isChecked;
        });
      });

      break; }
    case 'UPDATE_INPUT_RADIO': {
      break; }
    case 'UPDATE_INPUT_NUMBER': {
      const { event: { target } } = action;

      console.log(target);

      break; }
    default: break;
  }

  return nextState;
}

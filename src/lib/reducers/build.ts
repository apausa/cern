/* eslint-disable no-param-reassign */

import {
  BashScript, O2Cmd, BuildReducerAction, BashScriptArgs,
} from '@/types/build';

export default function buildReducer(currentState: BashScript, action: BuildReducerAction | any) {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case 'UPDATE_FORM_CHECKBOX': {
      const { event: { target: { name } } } = action;

      nextState.forEach((cmd: O2Cmd) => {
        cmd.args.forEach((arg: BashScriptArgs | undefined) => {
          if (arg!.name === name) arg!.isChecked = !arg!.isChecked;
        });
      });

      break; }
    case 'UPDATE_FORM_OTHER': {
      const { event: { target: { value, name } } } = action;

      nextState.forEach((cmd: O2Cmd) => {
        cmd.args.forEach((arg: BashScriptArgs | undefined) => {
          if (arg!.name === name) arg!.value = value;
        });
      });

      break; }
    default: break;
  }

  return nextState;
}

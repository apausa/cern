/* eslint-disable no-param-reassign */

import {
  BashScript, O2Cmd, BuildReducerAction, O2CmdArgs,
} from '@/types/dashboard/build';

export default function buildReducer(currentState: BashScript, action: BuildReducerAction) {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case 'UPDATE_INPUT_CHECKBOX': {
      const { event: { target: { name } } } = action;

      nextState.forEach((cmd: O2Cmd) => {
        cmd.args.forEach((arg: O2CmdArgs | undefined) => {
          if (arg!.name === name) arg!.isChecked = !arg!.isChecked;
        });
      });

      break; }
    case 'UPDATE_INPUT_OTHER': {
      const { event: { target: { value, name } } } = action;

      nextState.forEach((cmd: O2Cmd) => {
        cmd.args.forEach((arg: O2CmdArgs | undefined) => {
          if (arg!.name === name) arg!.value = value;
        });
      });

      break; }
    default: break;
  }

  return nextState;
}

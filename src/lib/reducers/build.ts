/* eslint-disable no-param-reassign */

import {
  BashScript, O2Cmd, BashScriptArgs,
} from '@/types/build';

export default function buildReducer(currentState: BashScript, action: any): any {
  const nextState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case 'UPDATE_FORM_CHECKBOX': {
      const { event: { target: { name } } }: any = action;

      nextState.forEach((cmd: O2Cmd): any => {
        cmd.args.forEach((arg: BashScriptArgs | undefined): any => {
          if (arg!.name === name) arg!.isChecked = !arg!.isChecked;
        });
      });

      break; }
    case 'UPDATE_FORM_OTHER': {
      const { event: { target: { value, name } } }: any = action;

      nextState.forEach((cmd: O2Cmd): any => {
        cmd.args.forEach((arg: BashScriptArgs | undefined): any => {
          if (arg!.name === name) arg!.value = value;
        });
      });

      break; }
    default: break;
  }

  return nextState;
}

/* eslint-disable no-param-reassign */

import {
  BashScript, BashScriptArgs, BuildActions, BashScriptCmds,
} from '@/types/build';

const buildReducer = (
  currentState: BashScript,
  action: BuildActions,
): BashScript => {
  const nextState: BashScript = currentState;

  switch (action.type) {
    case 'UPDATE_FORM_CHECKBOX': {
      const { event: { target: { name } } }: any = action;

      // @ develop
      // nextState = currentState.map((cmd: BashScriptCmds): BashScriptCmds => ({
      //   ...cmd,
      //   args: cmd.args.map((arg: BashScriptArgs): any => (
      //     (arg!.name === name) ? { ...arg, isChecked: !arg!.isChecked } : arg
      //   )),
      // }));

      break;
    }
    case 'UPDATE_FORM_OTHER': {
      const { event: { target: { value, name } } }: any = action;

      nextState.forEach((cmd: BashScriptCmds): any => {
        cmd.args.forEach((arg: BashScriptArgs | undefined): any => {
          if (arg!.name === name) arg!.value = value;
        });
      });

      break; }
    default: break;
  }

  return nextState;
};

export default buildReducer;

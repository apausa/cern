/* eslint-disable max-len */
/* eslint-disable object-property-newline */
/* eslint-disable no-param-reassign */

import {
  BashScript, BashScriptArgs, BuildActions, BashScriptCmds,
} from '@/types/build';

const buildReducer = (
  currentState: BashScript,
  action: BuildActions,
): BashScript => {
  let nextState: any = currentState;

  switch (action.type) {
    case 'UPDATE_FORM_CHECKBOX': nextState = currentState.map((cmd: BashScriptCmds): any => ({
      ...cmd, args: cmd.args.map((arg: BashScriptArgs): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, isChecked: !arg!.isChecked } : arg!
      )),
    })); break;
    case 'UPDATE_FORM_VALUE': nextState = currentState.map((cmd: BashScriptCmds): any => ({
      ...cmd, args: cmd.args.map((arg: BashScriptArgs): BashScriptArgs => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, value: action.event.target.value } : arg!
      )),
    })); break;
    default: break;
  }

  return nextState;
};

export default buildReducer;

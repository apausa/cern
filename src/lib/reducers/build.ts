/* eslint-disable object-property-newline */

import { O2CmdObj } from '@/types/build';

const buildReducer = (
  currentState: O2CmdObj,
  action: any,
): O2CmdObj => {
  let nextState: any = null;

  switch (action.type) {
    case 'UPDATE_CHECKED_PROPERTY': nextState = {
      ...currentState,
      args: currentState.args.map((arg: any): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, checked: !arg!.checked } : arg
      )),
    }; break;
    case 'UPDATE_VALUE_PROPERTY': nextState = {
      ...currentState,
      args: currentState.args.map((arg: any): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg, value: action.event.target.value } : arg
      )),
    }; break;
    default: break;
  }

  return nextState;
};

export default buildReducer;

import { FormEvent, Dispatch } from 'react';
import { O2CmdNumberArg } from '../build';

export type InputNumberAction = {
  type: 'UPDATE_INPUT_NUMBER',
  event: FormEvent
};

export type InputNumberProps = {
  arg: O2CmdNumberArg,
  dispatch: Dispatch<InputNumberAction>
};

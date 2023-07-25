import { FormEvent, Dispatch } from 'react';
import { O2CmdTGeantArg } from '../build';

export type InputRadioAction = {
  type: 'UPDATE_INPUT_RADIO',
  event: FormEvent
};

export type InputRadioProps = {
  arg: O2CmdTGeantArg
  dispatch: Dispatch<InputRadioAction>
};

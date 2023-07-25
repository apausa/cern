import { FormEvent, Dispatch } from 'react';
import {
  O2CmdConfigArg, O2CmdNumberArg, O2CmdPythiaArg, O2CmdTGeantArg,
} from '../build';

export type InputCheckboxAction = {
  type: 'UPDATE_INPUT_CHECKBOX',
  event: FormEvent
};

export type InputCheckboxProps = {
  arg: O2CmdNumberArg | O2CmdTGeantArg | O2CmdPythiaArg | O2CmdConfigArg,
  dispatch: Dispatch<InputCheckboxAction>
};

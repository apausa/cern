import { Dispatch, FormEvent } from 'react';

// Bash script

export type BashScript = [EvalCmd, O2Cmd];

// Eval command and arguments

export type EvalCmd = {
  title: 'eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)',
  description: string,
};

// O2 Command and arguments

export type O2Cmd = {
  title: 'o2-sim',
  description: string,
  args: [
    O2CmdNumberArg?,
    O2CmdTGeantArg?,
    O2CmdPythiaArg?,
    O2CmdConfigArg?,
  ]
};

export type O2CmdNumberArg = {
  isChecked: boolean,
  title: '-n',
  value: number,
  input: { min: number, max: number },
};

export type O2CmdTGeantArg = {
  isChecked: boolean,
  title: '-e',
  value: 'TGeant3' | 'TGeant4',
  input: { options: ['TGeant3', 'TGeant4'] },
};

export type O2CmdPythiaArg = {
  isChecked: boolean,
  title: '-g',
  value: 'pythia8pp',
};

export type O2CmdConfigArg = {
  isChecked: boolean,
  title: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
};

// O2 Fieldset

export type O2FieldsetProps = {
  command: O2Cmd,
  dispatch: any, // @develop
};

// Input checkbox

export type InputCheckboxAction = {
  type: 'UPDATE_INPUT_CHECKBOX',
  event: FormEvent
};

export type InputCheckboxProps = {
  arg: O2CmdNumberArg | O2CmdTGeantArg | O2CmdPythiaArg | O2CmdConfigArg,
  dispatch: Dispatch<InputCheckboxAction>
};
// Input radio

export type InputRadioAction = {
  type: 'UPDATE_INPUT_RADIO',
  event: FormEvent
};

export type InputRadioProps = {
  arg: O2CmdTGeantArg
  dispatch: Dispatch<InputRadioAction>
};

// Input number

export type InputNumberAction = {
  type: 'UPDATE_INPUT_NUMBER',
  event: FormEvent
};

export type InputNumberProps = {
  arg: O2CmdNumberArg,
  dispatch: Dispatch<InputNumberAction>
};

// Event fieldset

export type EvalFieldsetProps = {
  command: EvalCmd,
};

// Reducer

export type BuildReducerAction = InputNumberAction | InputRadioAction | InputCheckboxAction;

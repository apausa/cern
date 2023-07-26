import { Dispatch } from 'react';

// Bash script

export type BashScript = [EvalCmd, O2Cmd];

export type BashScriptCmds = EvalCmd | O2Cmd;

// Eval command and arguments

export type EvalCmd = {
  description: string,
  name: 'eval',
  args: ['$(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)']
};

// O2 Command and arguments

export type O2Cmd = {
  description: string,
  name: 'o2-sim',
  args: [
    O2CmdNumberArg?,
    O2CmdTGeantArg?,
    O2CmdPythiaArg?,
    O2CmdConfigArg?,
  ]
};

export type O2CmdNumberArg = {
  name: '-n',
  value: number,
  isChecked: boolean,

  input: { type: 'number', min: number, max: number },
};

export type O2CmdTGeantArg = {
  name: '-e',
  value: 'TGeant3' | 'TGeant4',
  isChecked: boolean,

  input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
};

export type O2CmdPythiaArg = {
  name: '-g',
  value: 'pythia8pp',
  isChecked: boolean,

  input: { type: null }
};

export type O2CmdConfigArg = {
  name: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
  isChecked: boolean,

  input: { type: null }

};

export type O2CmdArgs = O2CmdNumberArg | O2CmdTGeantArg | O2CmdPythiaArg | O2CmdConfigArg;

// Input checkbox

export type InputCheckboxAction = {
  type: 'UPDATE_INPUT_CHECKBOX',
  event: any // @develop
};

export type InputCheckboxProps = {
  arg: O2CmdArgs,
  dispatch: Dispatch<InputCheckboxAction>
};
// Input radio

export type InputOtherAction = {
  type: 'UPDATE_INPUT_OTHER',
  event: any // @develop
};

export type InputRadioProps = {
  arg: O2CmdTGeantArg
  dispatch: Dispatch<InputOtherAction>
};

export type InputNumberProps = {
  arg: O2CmdNumberArg,
  dispatch: Dispatch<InputOtherAction>
};

// Reducer

export type BuildReducerAction = InputOtherAction | InputCheckboxAction;

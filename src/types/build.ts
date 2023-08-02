import { Dispatch } from 'react';

// Bash script

export type BashScript = [EvalCmd, O2Cmd];

export type BashScriptCmds = EvalCmd | O2Cmd;

export type BashScriptArgs = O2CmdNumberArg
| O2CmdTGeantArg
| O2CmdPythiaArg
| O2CmdConfigArg
| EvalCmdVersionArg
| undefined;

// Eval command and arguments

export type EvalCmd = {
  description: string,
  name: 'eval',
  args: [EvalCmdVersionArg]
};

export type EvalCmdVersionArg = {
  isChecked: boolean,
  name: '$(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)',
  value: '\n',
  input: { type: null },
};

// O2 Command and arguments

export type O2Cmd = {
  description: string,
  name: 'o2-sim',
  args: [
    O2CmdPythiaArg?,
    O2CmdNumberArg?,
    O2CmdTGeantArg?,
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

// Reducer

export type BuildReducerAction = FormValueAction | FormCheckboxAction;

export type BuildUseReducer = [BashScript, Dispatch<any>];

// Actions

export type BuildActions = FormCheckboxAction | FormValueAction;

export type FormCheckboxAction = {
  type: 'UPDATE_FORM_CHECKBOX',
  event: any
};

export type FormValueAction = {
  type: 'UPDATE_FORM_VALUE',
  event: any
};

// Form checkbox component

export type FormCheckboxProps = {
  arg: BashScriptArgs,
  dispatch: Dispatch<FormCheckboxAction>
};

// Form radio component

export type FormRadioProps = {
  arg: O2CmdTGeantArg
  dispatch: Dispatch<FormValueAction>
};

export type FormNumberProps = {
  arg: O2CmdNumberArg,
  dispatch: Dispatch<FormValueAction>
};

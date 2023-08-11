import { Dispatch } from 'react';

// Eval command and arguments

export type TestVersionCmd = {
  name: 'eval',
  args: ['$(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)'],
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

export type BuildUseReducer = [O2Cmd, Dispatch<any>];

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
  arg: any,
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

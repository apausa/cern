import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

// O2 Command and arguments

export type O2CmdObj = {
  name: 'o2-sim',
  args: [
    O2CmdPythiaArg?,
    O2CmdNumberArg?,
    O2CmdTGeantArg?,
    O2CmdConfigArg?,
  ];
};

export type O2CmdArg = O2CmdPythiaArg | O2CmdNumberArg | O2CmdTGeantArg | O2CmdConfigArg;

export type O2CmdNumberArg = {
  name: '-n',
  value: number,
  checked: boolean,

  input: { type: 'number', min: number, max: number },
};

export type O2CmdTGeantArg = {
  name: '-e',
  value: 'TGeant3' | 'TGeant4',
  checked: boolean,

  input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
};

export type O2CmdPythiaArg = {
  name: '-g',
  value: 'pythia8pp',
  checked: boolean,

  input: { type: null }
};

export type O2CmdConfigArg = {
  name: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
  checked: boolean,

  input: { type: null }

};

// State

export type BuildReducerAction = {
  type: 'UPDATE_VALUE_PROPERTY' | 'UPDATE_CHECKED_PROPERTY',
  event: SyntheticEvent
};

export type O2CmdObjUseReducer = [
  O2CmdObj,
  Dispatch<BuildReducerAction>,
];

export type StrUseState = [
  string,
  Dispatch<SetStateAction<string>>,
];

// Props

export type BuildProps = {
  handleCreateSimulation: (o2cmd: string, version: string) => void,
  setBuild: Dispatch<SetStateAction<boolean>>
};

export type CheckboxInputProps = {
  arg: O2CmdArg,
  handleUpdateCheckedProperty: (event: SyntheticEvent) => void
};

export type AdvancedModeProps = {
  o2CmdStr: string,
  setO2CmdStr: Dispatch<SetStateAction<string>>,
};

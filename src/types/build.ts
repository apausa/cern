// Form component

export type Form = {
  selectedDate: string,
  cmdObj: CmdObj,
  cmdStr: string,
  advanced: boolean
};

// O2 Command and arguments

export type CmdObj = {
  name: 'o2-sim',
  args: [
    CmdPythiaArg,
    CmdNumberArg,
    CmdTGeantArg,
    CmdConfigArg,
  ];
};

export type CmdArg = CmdPythiaArg | CmdNumberArg | CmdTGeantArg | CmdConfigArg;

export type CmdNumberArg = {
  name: '-n',
  value: number,
  selected: boolean,
  disabled: boolean,
  input: { type: 'number', min: number, max: number },
};

export type CmdTGeantArg = {
  name: '-e',
  value: 'TGeant3' | 'TGeant4',
  selected: boolean,
  disabled: boolean,
  input: { type: 'select', options: ['TGeant3', 'TGeant4'] },
};

export type CmdPythiaArg = {
  name: '-g',
  value: 'pythia8pp',
  selected: boolean,
  disabled: boolean,
  input: { type: null },
};

export type CmdConfigArg = {
  name: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
  selected: boolean,
  disabled: boolean,
  input: { type: null },

};

// Props

export type BuildProps = any;
export type SidebarProps = any;
export type FormProps = any;
export type DefaultModeProps = any;
export type AdvancedModeProps = any;
export type SelectVersionProps = any;
export type NumberInputProps = any;
export type SelectInputProps = any;

// Hooks

export type BuildUseReducer = [Form, React.Dispatch<any>];

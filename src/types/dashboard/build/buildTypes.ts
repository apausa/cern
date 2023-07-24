// Bash script

export type BashScript = [EvalCmd, O2Cmd];

// Eval command

export type EvalCmd = {
  title: 'eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)',
  description: string
};

// O2 Command and arguments

export type O2Cmd = {
  title: 'o2-sim',
  description: string,
  args: [
    NumberArg?,
    TGeantArg?,
    PythiaArg?,
    ConfigArg?,
  ]
};

export type NumberArg = {
  isChecked: boolean,
  title: '-n',
  value: number,
  min: number,
  max: number,
};

export type TGeantArg = {
  isChecked: boolean,
  title: '-e',
  value: 'TGeant3' | 'TGeant4',
};

export type PythiaArg = {
  isChecked: boolean,
  title: '-g',
  value: 'pythia8pp',
};

export type ConfigArg = {
  isChecked: boolean,
  title: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
};

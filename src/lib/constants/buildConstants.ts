import {
  BashScript, EvalCmd, O2Cmd,
} from '@/types/buildTypes';

const evalCmd: EvalCmd = {
  title: 'eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)',
  description: 'Software version',
};

const o2Cmd: O2Cmd = {
  title: 'o2-sim',
  description: 'O2 Simulaton',
  args: [
    {
      isChecked: false,
      title: '-n',
      value: 0,
      min: 0,
      max: 10,
    },
    { isChecked: false, title: '-e', value: 'TGeant4' },
    { isChecked: false, title: '-g', value: 'pythia8pp' },
    { isChecked: false, title: '--configKeyValues', value: 'align-geom.mDetectors=none' },
  ],
};

const initialState: BashScript = [evalCmd, o2Cmd];

export default initialState;

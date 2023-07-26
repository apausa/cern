import { BashScript, EvalCmd, O2Cmd } from '@/types/dashboard/build';

const evalCmd: EvalCmd = {
  description: 'Software version',
  name: 'eval',
  args: ['$(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)'],
};

const o2Cmd: O2Cmd = {
  description: 'O2 Simulaton',
  name: 'o2-sim',
  args: [
    {
      isChecked: false,
      name: '-n',
      value: 10,
      input: { type: 'number', min: 0, max: 10 },
    },
    {
      isChecked: false,
      name: '-e',
      value: 'TGeant4',
      input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
    },
    {
      isChecked: false,
      name: '-g',
      value: 'pythia8pp',
      input: { type: null },
    },
    {
      isChecked: false,
      name: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
      input: { type: null },
    },
  ],
};

const initialState: BashScript = [evalCmd, o2Cmd];

export default initialState;

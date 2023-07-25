import { BashScript, EvalCmd, O2Cmd } from '@/types/dashboard/build';

const evalCmd: EvalCmd = {
  description: 'Software version',
  title: 'eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)',
  args: [],
};

const o2Cmd: O2Cmd = {
  description: 'O2 Simulaton',
  title: 'o2-sim',
  args: [
    {
      type: 'number',
      isChecked: false,
      title: '-n',
      value: 10,
      input: { min: 0, max: 10 },
    },
    {
      type: 'radio',
      isChecked: false,
      title: '-e',
      value: 'TGeant4',
      input: { options: ['TGeant3', 'TGeant4'] },
    },
    {
      type: 'checkbox',
      isChecked: false,
      title: '-g',
      value: 'pythia8pp',
    },
    {
      type: 'checkbox',
      isChecked: false,
      title: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
    },
  ],
};

const initialState: BashScript = [evalCmd, o2Cmd];

export default initialState;

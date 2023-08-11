import { TestVersionCmd, O2Cmd } from '@/types/build';

export const testVersionCmd: TestVersionCmd = {
  name: 'eval',
  args: ['$(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)'],
};

export const initialState: O2Cmd = {
  description: 'O2 Simulaton',
  name: 'o2-sim',
  args: [
    {
      isChecked: true,
      name: '-g',
      value: 'pythia8pp',
      input: { type: null },
    },
    {
      isChecked: true,
      name: '-n',
      value: 10,
      input: { type: 'number', min: 0, max: 10 },
    },
    {
      isChecked: true,
      name: '-e',
      value: 'TGeant4',
      input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
    },
    {
      isChecked: true,
      name: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
      input: { type: null },
    },
  ],
};

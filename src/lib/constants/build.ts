import { TestVersionCmd, O2Cmd, ProdVersionCmd } from '@/types/build';

export const testVersionCmd: TestVersionCmd = 'eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v20230629-1)';

export const prodVersionCmd: ProdVersionCmd = [
  '#JDL_PACKAGE=O2sim::v20230703-1',
  '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1',
];

export const o2cmd: O2Cmd = {
  name: 'o2-sim',
  args: [
    {
      checked: true,
      name: '-g',
      value: 'pythia8pp',
      input: { type: null },
    },
    {
      checked: true,
      name: '-n',
      value: 10,
      input: { type: 'number', min: 0, max: 10 },
    },
    {
      checked: true,
      name: '-e',
      value: 'TGeant4',
      input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
    },
    {
      checked: true,
      name: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
      input: { type: null },
    },
  ],
};

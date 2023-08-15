import { O2CmdObj } from '@/types/build';

const initialO2CmdObj: O2CmdObj = {
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

export default initialO2CmdObj;

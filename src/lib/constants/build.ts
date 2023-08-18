import { O2CmdObj } from '@/types/build';

const initialO2CmdObj: O2CmdObj = {
  name: 'o2-sim',
  args: [
    {
      name: '-g',
      value: 'pythia8pp',
      selected: true,
      disabled: true,
      input: { type: null },
    },
    {
      name: '-n',
      value: 10,
      selected: true,
      disabled: false,
      input: { type: 'number', min: 0, max: 10 },
    },
    {
      name: '-e',
      value: 'TGeant4',
      selected: true,
      disabled: false,
      input: { type: 'radio', options: ['TGeant3', 'TGeant4'] },
    },
    {
      name: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
      selected: true,
      disabled: true,
      input: { type: null },
    },
  ],
};

export default initialO2CmdObj;

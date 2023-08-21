import { Form, CmdObj } from '@/types/build';
import { getCmdStr } from '@/utils/getCmd';
import { getParsedCurrentDate } from '@/utils/getDate';

const initialCmdObj: CmdObj = {
  name: 'o2-sim',
  args: [
    {
      name: '-g',
      value: 'pythia8pp',
      selected: true,
      disabled: false,
      input: { type: null },
    },
    {
      name: '-n',
      value: 10,
      selected: true,
      disabled: false,
      input: {
        type: 'number', min: 1, max: 10,
      },
    },
    {
      name: '-e',
      value: 'TGeant4',
      selected: true,
      disabled: false,
      input: { type: 'select', options: ['TGeant3', 'TGeant4'] },
    },
    {
      name: '--configKeyValues',
      value: 'align-geom.mDetectors=none',
      selected: true,
      disabled: false,
      input: { type: null },
    },
  ],
};

const initialForm: Form = {
  date: getParsedCurrentDate(),
  cmdObj: initialCmdObj,
  cmdStr: getCmdStr(initialCmdObj),
  advancedMode: false,
};

export default initialForm;

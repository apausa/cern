import { Form, CmdObj } from '@/types/build';
import getCmdStr from '@/utils/getCmd';
import { getCurrentDate } from '@/utils/getDate';

const initialCmdObj: CmdObj = {
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
      disabled: true,
      input: {
        type: 'number', min: 1, max: 10,
      },
    },
    {
      name: '-e',
      value: 'TGeant4',
      selected: true,
      disabled: true,
      input: { type: 'select', options: ['TGeant3', 'TGeant4'] },
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

const initialForm: Form = {
  selectedDate: getCurrentDate(),
  cmdObj: initialCmdObj,
  cmdStr: getCmdStr(initialCmdObj),
  advanced: false,
};

export default initialForm;

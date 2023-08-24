import { Form, CmdObj } from '@/types/build';
import getCmdStr from '@/utils/getCmd';
import { getCurrentDate } from '@/utils/getDate';

const INITIAL_CMD_OBJ: CmdObj = {
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

const INITIAL_FORM: Form = {
  title: '',
  selectedDate: getCurrentDate(),
  cmdObj: INITIAL_CMD_OBJ,
  cmdStr: getCmdStr(INITIAL_CMD_OBJ),
  advanced: false,
};

export default INITIAL_FORM;

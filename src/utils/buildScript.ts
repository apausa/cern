import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Types
import { BashScript, BashScriptCmds } from '@/types/build';
import { Simulation } from '@/types/dashboard';

// Utils
import returnPath from '@/utils/returnPath';

const parseArrayToString = (bashScript: BashScript): string => (
  bashScript.reduce((acc: (string | number)[], val: BashScriptCmds): (string | number)[] => (
    acc.concat(val.name, ...val.args.map(({ name, value }: any): (string | number)[] => (
      [name, value])))), []).join(' '));

const buildScript = async (bashScript: BashScript): Promise<Simulation> => {
  const id: string = uuidv4();
  const filePath: string = returnPath(id);

  await fs.writeFile(filePath, parseArrayToString(bashScript));
  await fs.chmod(filePath, '755');

  return {
    bashScript,
    id,
    date: new Date(),
    testStatus: null,
    prodStatus: null,
  };
};

export default buildScript;

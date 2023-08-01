import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Types
import { BashScript, BashScriptCmds } from '@/types/build';
import { Simulation } from '@/types/dashboard';

// Utils
import returnPath from './returnPath';

const callback = (acc: string[], val: BashScriptCmds): any => (
  acc.concat(val.name, ...val.args.map( // @continue, and run
    ({ name, value }: any) => [name, value],
  )));

const parseObject = (bashScript: BashScript): string => (
  bashScript.reduce((callback), []).join(' '));

const createScript = async (bashScript: BashScript): Promise<Simulation> => {
  const id: string = uuidv4();
  const filePath: string = returnPath(id);

  await fs.writeFile(filePath, parseObject(bashScript));
  await fs.chmod(filePath, '755');

  return {
    bashScript, id, date: new Date(), status: 'PENDING',
  };
};

export default createScript;

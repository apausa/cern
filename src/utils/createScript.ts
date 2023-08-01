import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

import { BashScript } from '@/types/build';

import returnPath from './returnPath';

const callback = (acc: any, val: any): any => (
  acc.concat(val.name, ...val.args.map(({ name, value }: any): any => [name, value])));

const parseObject = (bashScript: BashScript): string => (
  bashScript.reduce((callback), []).join(' '));

const createScript = async (bashScript: BashScript) => {
  const id: string = uuidv4();
  const filePath: string = returnPath(id);

  await fs.writeFile(filePath, parseObject(bashScript));
  await fs.chmod(filePath, '755');

  return {
    bashScript, id, date: new Date(), status: 'pending',
  };
};

export default createScript;

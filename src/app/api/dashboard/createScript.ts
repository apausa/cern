import * as fs from 'node:fs/promises';
import path from 'node:path';

import { BashScript } from '@/types/components/dashboard/build';

const createContent = async (bashScript: BashScript) => {
  const contentArray: any = [];

  bashScript.forEach((cmd) => {
    contentArray.push(cmd.name);
    cmd.args.forEach(({ name, value }: any) => contentArray.push(name, value));
  });

  const contentString = contentArray.join(' ');

  return contentString;
};

const createScript = async (bashScript: BashScript, scriptName: string) => {
  const segment: string = '/work';
  const filePath: string = path.join(segment, `${scriptName}.sh`);
  const content = await createContent(bashScript);

  try {
    await fs.writeFile(filePath, content);
    console.log(`${scriptName} created`);
  } catch (error) { console.error(error); }

  return filePath;
};

export default createScript;

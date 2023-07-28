import * as fs from 'node:fs/promises';

import { BashScript } from '@/types/build';

const createContent = async (bashScript: BashScript) => {
  const contentArray: any = [];

  bashScript.forEach((cmd) => {
    contentArray.push(cmd.name);
    cmd.args.forEach(({ name, value }: any) => contentArray.push(name, value));
  });

  const contentString = contentArray.join(' ');

  return contentString;
};

const createScript = async (bashScript: BashScript, filePath: string) => {
  const content = await createContent(bashScript);

  try {
    await fs.writeFile(filePath, content);
    console.log(`${filePath} created`); // @delete
  } catch (error) {
    console.error(error); // @delete
  }

  return filePath;
};

export default createScript;

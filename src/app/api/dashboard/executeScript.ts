import * as fs from 'node:fs/promises';
import { ChildProcess, spawn } from 'child_process';

import EXEC_CMD from '@/lib/constants/dashboard';
import { BashScript } from '@/types/build';
import parseObject from '@/lib/utils/parseObject';

const executeScript = async (script: BashScript, filePath: string) => {
  await fs.writeFile(filePath, parseObject(script));
  await fs.chmod(filePath, '755');

  const { name, args } = EXEC_CMD;
  const childProcess: ChildProcess = await spawn(name, [...args, filePath]);

  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });

  return new Promise((resolve: any, reject: any) => {
    childProcess.on('error', (output: any) => {
      console.error('backend, error', output);
      reject(new Error(output));
    });
    childProcess.on('close', (output: any) => {
      console.log('backend, error', output);
      resolve(output);
    });
  });
};

export default executeScript;

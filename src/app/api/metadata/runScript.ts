import { ChildProcess, spawn } from 'child_process';

// Constants
import { PROD_VERSION_CMD, PROD_EXEC_CMD, TEST_EXEC_CMD } from '@/lib/constants/api';

// Utils
import setStatus from '@/utils/setStatus';
import { getSelectedVersion } from '@/utils/getDate';

// Types
import { Metadata } from '@/types/lib';
import { ProdVersionCmd, TestExecCmd } from '@/types/app/api';

export const runTestScript = (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: TestExecCmd = TEST_EXEC_CMD;
  const childProcess: ChildProcess = spawn(name, [...args, metadata.testScript.scriptPath]);

  childProcess.stdout?.on('data', (output: any) => { console.log(output.toString()); }); // @delete
  childProcess.stderr?.on('data', (output: any) => { console.log(output.toString()); }); // @delete

  return new Promise((resolve): void => {
    childProcess.on('close', (output: number) => {
      resolve(setStatus(metadata, (output === 0) ? 'FULFILLED' : 'REJECTED'));
    });
    childProcess.on('error', () => { resolve(setStatus(metadata, 'REJECTED')); });
  });
};

export const runProdScript = async (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: ProdVersionCmd = PROD_VERSION_CMD(
    getSelectedVersion(metadata.form.selectedDate),
  );
  const childProcess: ChildProcess = spawn(name, args);

  childProcess.stdin?.write(PROD_EXEC_CMD(metadata.prodScript.scriptPath));
  childProcess.stdin?.end('exit');

  childProcess.stdout?.on('data', (output: any) => { console.log(output.toString()); }); // @delete
  childProcess.stderr?.on('data', (output: any) => { console.log(output.toString()); }); // @delete

  return new Promise((resolve): void => {
    childProcess.on('close', (output: number) => {
      resolve(setStatus(metadata, (output === 0) ? 'FULFILLED' : 'REJECTED'));
    });
    childProcess.on('error', () => { resolve(setStatus(metadata, 'REJECTED')); });
  });
};

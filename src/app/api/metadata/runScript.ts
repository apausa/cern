import { ChildProcess, spawn } from 'child_process';

// Lib

// Utils
import { prodVersionCmd, prodExecCmd, testExecCmd } from '@/lib/constants/api';
import setStatus from '@/utils/setStatus';

// Types
import { Metadata } from '@/types/dashboard';
import { ProdVersionCmd, TestExecCmd } from '@/types/api';
import { getSelectedVersion } from '@/utils/getDate';

export const runTestScript = (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: TestExecCmd = testExecCmd;
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
  const { name, args }: ProdVersionCmd = prodVersionCmd(
    getSelectedVersion(metadata.form.selectedDate),
  );
  const childProcess: ChildProcess = spawn(name, args);

  childProcess.stdin?.write(prodExecCmd(metadata.prodScript.scriptPath));
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

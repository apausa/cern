import { ChildProcess, spawn } from 'child_process';

// Lib
import { testExecCmd } from '@/lib/constants/metadata';

// Utils
import { getProdAlienvCmd, getProdExecCmd } from '@/utils/getCmd';
import setStatus from '@/utils/setStatus';

// Types
import { Metadata } from '@/types/dashboard';
import { ProdAlienvCmd, TestExecCmd } from '@/types/metadata';
import { getVersion } from '@/utils/getDate';

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
  const { name, args }: ProdAlienvCmd = getProdAlienvCmd(getVersion(metadata.form.date));
  const childProcess: ChildProcess = spawn(name, args);

  childProcess.stdin?.write(getProdExecCmd(metadata.prodScript.scriptPath));
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

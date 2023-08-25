import { ChildProcess, spawn } from 'child_process';

// Constants
import { TEST_EXEC_CMD } from '@/lib/constants/api';

// Utils
import { setTestStatus } from '@/utils/setStatus';

// Types
import { Metadata } from '@/types/lib';
import { TestExecCmd } from '@/types/app/api';

const runScriptInTest = (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: TestExecCmd = TEST_EXEC_CMD;
  const childProcess: ChildProcess = spawn(name, [...args, metadata.testScript.scriptPath]);

  childProcess.stdout?.on('data', (output: any) => { console.log(output.toString()); }); // @delete

  return new Promise((resolve): void => {
    childProcess.on('close', (output: number) => {
      resolve(setTestStatus(metadata, (output === 0) ? 'FULFILLED' : 'REJECTED'));
    });
    childProcess.on('error', () => { resolve(setTestStatus(metadata, 'REJECTED')); });
    childProcess.stderr?.on('data', () => { resolve(setTestStatus(metadata, 'REJECTED')); });
  });
};

export default runScriptInTest;

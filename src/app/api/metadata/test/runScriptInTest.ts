import { ChildProcess, spawn } from 'child_process';

// Constants
import { TEST_EXEC_CMD } from '@/lib/state/constants/api';

// Types
import { Metadata } from '@/types/lib';
import { TestExecCmd } from '@/types/app/api';

const runScriptInTest = (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: TestExecCmd = TEST_EXEC_CMD;
  const childProcess: ChildProcess = spawn(name, [...args, metadata.testScript.scriptPath]);

  return new Promise((resolve, reject): void => {
    childProcess.on('close', (output: number) => {
      resolve({
        ...metadata,
        testScript: {
          ...metadata.testScript,
          scriptStatus: (output === 0) ? 'FULFILLED' : 'REJECTED',
          rejectedOutput: null,
        },
      });
    });
    childProcess.on('error', (error: Error): void => { reject(error); });
    childProcess.stderr?.on('data', (error: Error): void => { reject(error); });
  });
};

export default runScriptInTest;

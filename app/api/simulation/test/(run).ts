import { ChildProcess, spawn } from 'child_process';

// Constants
import { TEST_EXEC_CMD } from '@/_lib/constants/apiConstants';

// Types
import { TestExecCmd } from '@/_types/app/apiTypes';
import { Simulation } from '@/_types/components/simulationTypes';

const runScriptInTest = (simulation: Simulation): Promise<Simulation> => {
  const { name, args }: TestExecCmd = TEST_EXEC_CMD;
  const childProcess: ChildProcess = spawn(name, [...args, simulation.testScript.scriptPath]);

  return new Promise((resolve, reject): void => {
    childProcess.on('close', (output: number) => {
      resolve({
        ...simulation,
        testScript: {
          ...simulation.testScript,
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

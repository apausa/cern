import { ChildProcess, spawn } from 'child_process';

// Lib
import EXEC_CMD from '@/lib/constants/dashboard';

// Utils
import returnPath from '@/utils/returnPath';

// Types
import { ExecCmd, Simulation } from '@/types/dashboard';

export const runScriptInTest = async (simulation: Simulation): Promise<Simulation> => {
  const { name, args }: ExecCmd = EXEC_CMD;
  const childProcess: ChildProcess = await spawn(name, [...args, returnPath(simulation.id)]);

  // @develop implement web sockets
  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });

  return new Promise((resolve): void => {
    childProcess.on('close', () => { resolve({ ...simulation, testStatus: 'FULFILLED' }); });
    childProcess.on('error', () => { resolve({ ...simulation, testStatus: 'REJECTED' }); });
  });
};

export const runScriptInProd = async (simulation: Simulation): Promise<Simulation> => (
  new Promise((resolve): void => { resolve(simulation); })
);

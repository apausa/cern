import { ChildProcess, spawn } from 'child_process';

// Lib
import EXEC_CMD from '@/lib/constants/dashboard';

// Utils
import returnPath from '@/utils/returnPath';

// Types
import { ExecCmd, Simulation } from '@/types/dashboard';

const executeScript = async (simulation: Simulation): Promise<Simulation> => {
  const { name, args }: ExecCmd = EXEC_CMD;
  const childProcess: ChildProcess = await spawn(name, [...args, returnPath(simulation.id)]);

  return new Promise((resolve: any) => {
    childProcess.on('close', () => { resolve({ ...simulation, status: 'FULFILLED' }); });
    childProcess.on('error', () => { resolve({ ...simulation, status: 'REJECTED' }); });
  });
};

export default executeScript;

// @develop implement web sockets
// childProcess.stdout?.on('data', (output: any) => {
//   console.log('data', output.toString());
// });

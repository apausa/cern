import { ChildProcess, spawn } from 'child_process';
import EXEC_CMD from '@/lib/constants/dashboard';
import returnPath from '@/utils/returnPath';

const executeScript = async (simulation: any) => {
  const { name, args } = EXEC_CMD;
  const childProcess: ChildProcess = await spawn(name, [...args, returnPath(simulation.id)]);

  return new Promise((resolve: any) => {
    childProcess.on('close', () => { resolve({ ...simulation, status: 'fulfilled' }); });
    childProcess.on('error', () => { resolve({ ...simulation, status: 'rejected' }); });
  });
};

export default executeScript;

// @develop implement web sockets
// childProcess.stdout?.on('data', (output: any) => {
//   console.log('data', output.toString());
// });

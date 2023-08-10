import { ChildProcess, spawn } from 'child_process';

// Lib
import { ALIENV_CMD, EXEC_CMD, submitCmd } from '@/lib/constants/dashboard';

// Utils
import returnPath from '@/utils/returnPath';

// Types
import { ExecCmd, Simulation } from '@/types/dashboard';
import { parseCmd } from './parsers';

const chooseVersion = async () => {
  const { name, args }: any = ALIENV_CMD;
  const parsedArgs: string[] = parseCmd(args);

  console.log('In choose version', parsedArgs);
  const alienvProcess: ChildProcess = spawn(name, parsedArgs);
  console.log('4');
  return new Promise((resolve): void => {
    alienvProcess.on('close', () => { resolve(true); });
    alienvProcess.on('error', () => { resolve(false); });
  });
};

export const runScriptInTest = async (simulation: Simulation): Promise<Simulation> => {
  const { name, args }: ExecCmd = EXEC_CMD;
  const childProcess: ChildProcess = await spawn(name, [...args, returnPath(simulation.id)]);

  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });

  return new Promise((resolve): void => { // @develop, return reject. also, throw error
    childProcess.on('close', () => { resolve({ ...simulation, testStatus: 'FULFILLED' }); });
    childProcess.stderr?.on('data', () => { resolve({ ...simulation, testStatus: 'REJECTED' }); }); // this is where it enters when the objject is not right
    childProcess.on('error', () => { resolve({ ...simulation, testStatus: 'REJECTED' }); });
  });
};

export const runScriptInProd = async (simulation: Simulation): Promise<Simulation> => {
  console.log('3');
  const success = await chooseVersion();
  if (!success) throw new Error('Intentional error occurred'); // @develop

  const { name, args }: any = submitCmd;
  const parsedArgs: string[] = parseCmd(args, simulation.id);
  console.log('In run script in prod', parsedArgs);
  const childProcess: ChildProcess = spawn(name, parsedArgs);

  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });

  return new Promise((resolve): void => { // @develop, return reject. also, throw error
    childProcess.on('close', () => { resolve({ ...simulation, prodStatus: 'FULFILLED' }); });
    childProcess.stderr?.on('data', () => { resolve({ ...simulation, testStatus: 'REJECTED' }); });
    childProcess.on('error', () => { resolve({ ...simulation, testStatus: 'REJECTED' }); });
  });
};

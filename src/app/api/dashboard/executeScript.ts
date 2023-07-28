import { ChildProcess, spawn } from 'child_process';

import execScript from '@/lib/constants/dashboard';

const executeScript = async (filePath: string) => {
  const { name, args } = execScript;
  const childProcess: ChildProcess = spawn(name, [...args, filePath]);

  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });
  childProcess.stderr?.on('data', (output: any) => { console.error('data', output.toString()); });
  childProcess.on('error', (output: any) => { console.error('error', output.toString()); });
  childProcess.on('close', (output: any) => { console.log('close', output.toString()); });
};

export default executeScript;

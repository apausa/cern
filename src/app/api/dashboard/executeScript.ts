import { ChildProcess, spawn } from 'child_process';

const executeScript = async (filePath: string) => {
  const childProcess: ChildProcess = spawn('bash', [filePath]);

  childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });
  childProcess.stderr?.on('data', (output: any) => { console.error('data', output.toString()); });
  childProcess.on('error', (output: any) => { console.error('error', output.toString()); });
  childProcess.on('close', (output: any) => { console.log('close', output.toString()); });
};

export default executeScript;

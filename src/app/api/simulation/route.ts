/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import { v4 as uuidv4 } from 'uuid';
import { ChildProcess } from 'child_process';
// import { NextResponse } from 'next/server';
import { BashScript } from '@/types/components/dashboard/build';

const createFile = async (bashScript: BashScript, spawn: any, scriptName: string) => {
  const contentArray: any = [];
  const command: string = 'echo';

  bashScript.forEach((cmd) => {
    contentArray.push(cmd.name);
    cmd.args.forEach(({ name, value }: any) => contentArray.push(name, value));
  });

  const args = [
    '-e', contentArray.join(' '), '>>', `${scriptName}.sh`,
  ];

  // const process: ChildProcess = spawn(command, args);

  return process;
};

export async function POST(request: Request) {
  const bashScript: BashScript = await request.json();
  const { spawn }: any = require('child_process');
  const scriptName: string = uuidv4();

  createFile(bashScript, spawn, scriptName);
}

// const listen = async (process: Promise<ChildProcess>) => {
//   process.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });
//   process.stderr?.on('data', (output: any) => { console.error('data', output.toString()); });
//   process.on('error', (output: any) => { console.error('error', output.toString()); });
//   process.on('close', (output: any) => { console.log('close', output.toString()); });
// };

// createSimulation(bashScript, spawn);
// const executionProcess = executeSimulation(bashScript, spawn);
// listen(executionProcess);

// return NextResponse.json(simulation);

// const executeSimulation = async (bashScript, spawn, name) => {
//   // const process: ChildProcess = spawn(command, serverArgs);

// };

// const simulation = {
//   process, command, clientArgs, date: new Date(), status: 'IN_PROGRESS',
// };

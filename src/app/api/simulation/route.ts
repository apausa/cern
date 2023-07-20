/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import { ChildProcess } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { command, clientArgs }: any = await request.json();
  const serverArgs = clientArgs.map((clientArg: any) => clientArg.description);
  const { spawn } = require('child_process');
  const process: ChildProcess = spawn(command, serverArgs);

  process.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });
  process.stderr?.on('data', (output: any) => { console.error('data', output.toString()); });
  process.on('error', (output: any) => { console.error('error', output.toString()); });
  process.on('close', (output: any) => { console.log('close', output.toString()); });

  const simulation = {
    process, command, clientArgs, date: new Date(), status: 'IN_PROGRESS',
  };

  return NextResponse.json(simulation);
}

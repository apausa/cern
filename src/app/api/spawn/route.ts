/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import { ChildProcess } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { command, argumentsArray }: any = await request.json();
  const { spawn } = require('child_process');
  const simulation: ChildProcess = spawn(command, argumentsArray);

  simulation.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });
  simulation.stderr?.on('data', (output: any) => { console.error('data', output.toString()); });
  simulation.on('error', (output: any) => { console.error('error', output.toString()); });
  simulation.on('close', (output: any) => { console.log('close', output.toString()); });

  return NextResponse.json(simulation);
}

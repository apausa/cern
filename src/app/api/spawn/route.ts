/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { command, argumentsArray }: any = await request.json();
  const { spawn } = require('child_process');
  const simulation = spawn(command, argumentsArray);

  // Move to GET
  simulation.stdout.on('data', (output: any) => { console.log(output.toString()); });
  simulation.stderr.on('data', (output: any) => { console.error(output.toString()); });
  simulation.on('error', (output: any) => { console.error(output.toString()); });
  simulation.on('close', (output: any) => { console.log(output.toString()); });

  return NextResponse.json(simulation);
}

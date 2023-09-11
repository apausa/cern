/* eslint-disable no-control-regex */

import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';
import { GridExecCmdArgs, PutSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { createFile, getRejectedSimulation, getResolvedSimulation } from '@/_private/utils/api';

const getFulfilledOutput = (childProcess: ChildProcess): string[] | null => {
  const fulfilledOutput: string[] = [];

  childProcess.stderr?.on('data', (output: string) => {
    console.log(output.toString()); // @delete
    fulfilledOutput.push(output.toString());
  });

  return fulfilledOutput || null;
};

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { scripts: { gridRunWorkflow } }: Simulation = unresolvedSimulation;

  try {
    await createFile(unresolvedSimulation.id, gridRunWorkflow);

    const args: GridExecCmdArgs = ['--script', gridRunWorkflow.scriptPath, '--wait', '--fetch-output-files'];
    const childProcess: ChildProcess = spawn(process.env.GRID_SUBMIT_PATH!, args);
    const resolvedSimulation: Simulation = await new Promise((resolve, reject): void => {
      const fulfilledOutput: string[] | null = getFulfilledOutput(childProcess);

      childProcess.on('error', (error: Error): void => { reject(error); });
      childProcess.on('close', (code: number): void => {
        resolve(getResolvedSimulation(unresolvedSimulation, 'gridRunWorkflow', code, fulfilledOutput));
      });
    });

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(getRejectedSimulation(unresolvedSimulation, 'gridRunWorkflow', error), { status: 500 });
  }
}

// const fulfilledOutput: Outputs = {
//   gridDirectory: null,
//   localDirectory: null,
//   gridUrl: null,
//   gridId: null,
// };

// const gridDirectory: string[] | null = parsedOutput.match(GRID_DIRECTORY_REGEXP);
// const localDirectory: string[] | null = parsedOutput.match(LOCAL_DIRECTORY_REGEXP);
// const gridUrl: string[] | null = parsedOutput.match(GRID_URL_REGEXP);
// const gridId: string[] | null = parsedOutput.match(GRID_ID_REGEXP);

// if (gridDirectory) fulfilledOutput.gridDirectory = gridDirectory[1].replace(/\x1B\[.*?m/g, '');
// if (localDirectory) fulfilledOutput.localDirectory = localDirectory[1]
//  .replace(/\x1B\[.*?m/g, '');
// if (gridUrl) fulfilledOutput.gridUrl = gridUrl[1].replace(/\x1B\[.*?m/g, '');
// if (gridId) fulfilledOutput.gridId = gridId[1].replace(/\x1B\[.*?m/g, '');

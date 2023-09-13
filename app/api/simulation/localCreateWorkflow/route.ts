/* eslint-disable max-len */
import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

//  Constants
import { APPTAINER_PATH } from '@/_private/lib/constants/apiConstants';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';
import { LocalRunArgs, PutSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { createFile, getLocalArgs } from '@/_private/utils/api';

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { scripts: { localCreateWorkflow } }: Simulation = unresolvedSimulation;

  try {
    await createFile(unresolvedSimulation.id, localCreateWorkflow);

    const args: LocalRunArgs = getLocalArgs(unresolvedSimulation.id, localCreateWorkflow.scriptPath);
    const childProcess: ChildProcess = spawn(APPTAINER_PATH, args);
    const stderrData: string[] = [];
    const stdoutData: string[] = [];

    const resolvedSimulation: Simulation = await new Promise((resolve, reject): void => {
      childProcess.stdout?.on('data', (data: Buffer): void => { stdoutData.push(data.toString()); });
      childProcess.stderr?.on('data', (data: Buffer): void => { stderrData.push(data.toString()); });
      childProcess.on('error', (error: Error): void => { reject(error); });
      childProcess.on('close', (output: number): void => {
        resolve({
          ...unresolvedSimulation,
          scripts: {
            ...unresolvedSimulation.scripts,
            localCreateWorkflow: {
              ...unresolvedSimulation.scripts.localCreateWorkflow,
              scriptStatus: (output === 0) ? 'Completed' : 'Error',
              stdoutData: stdoutData.join(''),
              stderrData: stderrData.join(''),
            },
          },
        });
      });
    });

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        ...unresolvedSimulation,
        scripts: {
          ...unresolvedSimulation.scripts,
          localCreateWorkflow: {
            ...unresolvedSimulation.scripts.localCreateWorkflow,
            scriptStatus: 'Error',
            stderrData: (error instanceof Error) ? error.message : null,
          },
        },
      },
      { status: 500 },
    );
  }
}

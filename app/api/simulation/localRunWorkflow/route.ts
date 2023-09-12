import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

//  Constants
import { APPTAINER_PATH } from '@/_private/lib/constants/apiConstants';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';
import { LocalRunArgs, PutSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { createFile, getLocalArgs } from '@/_private/utils/api';

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { scripts: { localRunWorkflow } }: Simulation = unresolvedSimulation;

  try {
    await createFile(unresolvedSimulation.id, localRunWorkflow);

    const args: LocalRunArgs = getLocalArgs(unresolvedSimulation.id, localRunWorkflow.scriptPath);
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
            localRunWorkflow: {
              ...unresolvedSimulation.scripts.localRunWorkflow,
              scriptStatus: (output === 0) ? 'FULFILLED' : 'REJECTED',
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
          localRunWorkflow: {
            ...unresolvedSimulation.scripts.localRunWorkflow,
            scriptStatus: 'REJECTED',
            stderrData: (error instanceof Error) ? error.message : null,
          },
        },
      },
      { status: 500 },
    );
  }
}

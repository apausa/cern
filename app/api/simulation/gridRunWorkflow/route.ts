import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';
import { GridRunArgs, PutSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { createFile, getSegment } from '@/_private/utils/api';

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { form: { subjobs }, scripts: { gridRunWorkflow }, id }: Simulation = unresolvedSimulation;

  try {
    // Creates script
    const segment: string = getSegment(process.env.SCRIPTS_DIRECTORY_PATH!, id);
    await createFile(segment, gridRunWorkflow);

    // Runs script
    const args: GridRunArgs = ['--script', gridRunWorkflow.scriptPath, '--wait', '--fetch-output-files', '--split', subjobs];
    const childProcess: ChildProcess = spawn(process.env.GRID_SUBMIT_PATH!, args);
    const stderrData: string[] = [];
    const stdoutData: string[] = [];

    const resolvedSimulation: Simulation = await new Promise((resolve, reject): void => {
      childProcess.stdout?.on('data', (data: Buffer): void => { stdoutData.push(data.toString()); });
      childProcess.stderr?.on('data', (data: Buffer): void => { stderrData.push(data.toString()); });
      childProcess.on('error', (error: Error): void => { reject(error); });
      childProcess.on('close', (code: number): void => {
        resolve({
          ...unresolvedSimulation,
          scripts: {
            ...unresolvedSimulation.scripts,
            gridRunWorkflow: {
              ...unresolvedSimulation.scripts.gridRunWorkflow,
              scriptStatus: (code === 0) ? 'Completed' : 'Error',
              stdoutData: stdoutData.join(''),
              stderrData: stderrData.join(''),
            },
          },
        });
      });
    });

    // Returns script
    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        ...unresolvedSimulation,
        scripts: {
          ...unresolvedSimulation.scripts,
          gridRunWorkflow: {
            ...unresolvedSimulation.scripts.gridRunWorkflow,
            scriptStatus: 'Error',
            stderrData: (error instanceof Error) ? error.message : null,
          },
        },
      },
      { status: 500 },
    );
  }
}

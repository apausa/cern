import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';
import { ApptainerPath, LocalRunArgs, PutSimulation } from '@/_private/types/api';

// Utils
import {
  createFile, getLocalArgs, getSegment, readFile,
} from '@/_private/utils/api';

// Constants
const APPTAINER_PATH: ApptainerPath = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { scripts: { visualizeWorkflow }, id }: Simulation = unresolvedSimulation;

  try {
    // Creates script
    const segment: string = getSegment(process.env.SCRIPTS_DIRECTORY_PATH!, id);
    await createFile(segment, visualizeWorkflow);

    // Runs script
    const args: LocalRunArgs = getLocalArgs(segment, visualizeWorkflow.scriptPath);
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
            visualizeWorkflow: {
              ...unresolvedSimulation.scripts.visualizeWorkflow,
              scriptStatus: (output === 0) ? 'Completed' : 'Error',
              stdoutData: stdoutData.join(''),
              stderrData: stderrData.join(''),
            },
          },
        });
      });
    });

    resolvedSimulation.scripts.visualizeWorkflow.graphvizData = await readFile(getSegment(segment, 'workflow.gv'));

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        ...unresolvedSimulation,
        scripts: {
          ...unresolvedSimulation.scripts,
          visualizeWorkflow: {
            ...unresolvedSimulation.scripts.visualizeWorkflow,
            scriptStatus: 'Error',
            stderrData: (error instanceof Error) ? error.message : null,
          },
        },
      },
      { status: 500 },
    );
  }
}

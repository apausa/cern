import { NextResponse } from 'next/server';
import { ChildProcess, spawn } from 'child_process';

import { TEST_EXEC_CMD } from '@/_private/lib/constants/apiConstants';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';
import { PutSimulation, TestExecCmd } from '@/_private/types/app/apiTypes';

// Utils
import { createFile, getRejectedSimulation, getResolvedSimulation } from '@/_private/utils/api';

const getFulfilledOutput = (childProcess: ChildProcess): string[] => {
  const fulfilledOutput: string[] = [];

  childProcess.stdout?.on('data', (output: string): void => {
    console.log(output.toString()); // @delete
    fulfilledOutput.push(output.toString());
  });

  return fulfilledOutput || null;
};

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();
  const { scripts: { localCreateWorkflow } }: Simulation = unresolvedSimulation;

  try {
    await createFile(unresolvedSimulation.id, localCreateWorkflow);

    const { name, args }: TestExecCmd = TEST_EXEC_CMD;
    const childProcess: ChildProcess = spawn(name, [...args, localCreateWorkflow.scriptPath]);
    const resolvedSimulation: Simulation = await new Promise((resolve, reject): void => {
      const fulfilledOutput: string[] | null = getFulfilledOutput(childProcess);

      childProcess.on('error', (error: Error): void => { reject(error); });
      childProcess.on('close', (output: number) => {
        resolve(getResolvedSimulation(unresolvedSimulation, 'localCreateWorkflow', output, fulfilledOutput));
      });
    });

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(getRejectedSimulation(unresolvedSimulation, 'localCreateWorkflow', error), { status: 500 });
  }
}

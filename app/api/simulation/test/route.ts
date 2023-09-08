import { NextResponse } from 'next/server';
import runScriptInTest from './_run';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';
import { PutSimulation } from '@/_private/types/app/apiTypes';

export async function PUT(request: Request): Promise<PutSimulation> {
  const unresolvedSimulation: Simulation = await request.json();

  try {
    const resolvedSimulation: any = await runScriptInTest(unresolvedSimulation);

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      ...unresolvedSimulation,
      testScript: {
        ...unresolvedSimulation.testScript,
        scriptStatus: 'REJECTED',
        rejectedOutput: (error instanceof Error) ? error.message : null,
      },
    }, { status: 500 });
  }
}

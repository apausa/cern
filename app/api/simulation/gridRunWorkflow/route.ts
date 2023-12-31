import { NextResponse } from 'next/server';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Utils
import { MOCK_STDERR, MOCK_STDOUT } from '@/_private/utils/mock';

export async function PUT(request: Request): Promise<any> {
  const unresolvedSimulation: Simulation = await request.json();

  return NextResponse.json({
    ...unresolvedSimulation,
    scripts: {
      ...unresolvedSimulation.scripts,
      gridRunWorkflow: {
        ...unresolvedSimulation.scripts.gridRunWorkflow,
        scriptStatus: 'Completed',
        stdoutData: MOCK_STDOUT,
        stderrData: MOCK_STDERR,
      },
    },
  }, { status: 200 });
}

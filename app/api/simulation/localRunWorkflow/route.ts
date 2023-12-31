import { NextResponse } from 'next/server';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Utils
import { MOCK_STDERR, MOCK_STDOUT } from '@/_private/utils/mock';

// Constants

export async function PUT(request: Request): Promise<any> {
  const unresolvedSimulation: Simulation = await request.json();

  return NextResponse.json({
    ...unresolvedSimulation,
    scripts: {
      ...unresolvedSimulation.scripts,
      localRunWorkflow: {
        ...unresolvedSimulation.scripts.localRunWorkflow,
        scriptStatus: 'Completed',
        stdoutData: MOCK_STDOUT,
        stderrData: MOCK_STDERR,
      },
    },
  }, { status: 200 });
}

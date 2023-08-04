import { NextResponse } from 'next/server';

// Types
import { BashScript } from '@/types/build';
import { DashboardPost, DashboardPut, Simulation } from '@/types/dashboard';

// Utils
import returnError from '@/utils/returnError';
import buildScript from '@/utils/buildScript';
import { runScriptInProd, runScriptInTest } from '@/utils/runScript';

export async function POST(request: Request): Promise<DashboardPost> {
  try {
    const buildState: BashScript = await request.json();
    const createdSimulation: Simulation = await buildScript(buildState);

    // @develop Create simulation in DD. BB.

    return NextResponse.json(createdSimulation, { status: 200 });
  } catch (error: unknown) { return returnError(error); }
}

export async function PUT(request: Request): Promise<DashboardPut> {
  try {
    const unresolvedSimulation: Simulation = await request.json();

    // @develop Update unresolvedSimulation in DD. BB. ("PENDING")

    const resolvedSimulation: Simulation = (unresolvedSimulation.testStatus === 'FULFILLED')
      ? await runScriptInProd(unresolvedSimulation)
      : await runScriptInTest(unresolvedSimulation);

    // @develop Update resolvedSimulation in DD. BB. ("FULFILLED | "REJECTED")

    return NextResponse.json(resolvedSimulation, { status: 200 });
  } catch (error: unknown) { return returnError(error); }
}

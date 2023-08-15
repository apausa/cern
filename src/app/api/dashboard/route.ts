import { NextResponse } from 'next/server';

// Types
import { DashboardPost, DashboardPut, Simulation } from '@/types/dashboard';

// Utils
import getError from '@/utils/getError';
import buildScript from './buildScript';
import { runScriptInProd, runScriptInTest } from './runScript';

export async function POST(request: Request): Promise<DashboardPost> {
  try {
    const parsedForm: any = await request.json();
    const createdSimulation: Simulation = await buildScript(parsedForm);

    // @develop Create simulation in DD. BB.

    return NextResponse.json(createdSimulation, { status: 200 });
  } catch (error: unknown) { return getError(error); }
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
    // @develop, when error, return error and also reject simulation promise
  } catch (error: unknown) { return getError(error); }
}

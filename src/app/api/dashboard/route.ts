import { NextResponse } from 'next/server';

// Types
import { BashScript } from '@/types/build';
import { DashboardPost, DashboardPut, Simulation } from '@/types/dashboard';

// Utils
import returnError from '@/utils/returnError';
import createScript from '@/utils/createScript';
import executeScript from '@/utils/executeScript';

export async function POST(request: Request): Promise<DashboardPost> {
  try {
    const buildState: BashScript = await request.json();
    const simulation: Simulation = await createScript(buildState);

    return NextResponse.json(simulation, { status: 200 });
  } catch (error: unknown) { return returnError(error); }
}

export async function PUT(request: Request): Promise<DashboardPut> {
  try {
    const simulation: Simulation = await request.json();
    const promise: Simulation = await executeScript(simulation);

    return NextResponse.json(promise, { status: 200 });
  } catch (error: unknown) { return returnError(error); }
}

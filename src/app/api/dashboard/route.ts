import { NextResponse } from 'next/server';

// Types
import { BashScript } from '@/types/build';

// Lib
import returnError from '@/utils/returnError';
import createScript from '@/utils/createScript';
import executeScript from '@/utils/executeScript';

export async function POST(request: Request) {
  try {
    const buildState: BashScript = await request.json();
    const simulation = await createScript(buildState);

    return NextResponse.json(simulation, { status: 200 });
  } catch (error) { return returnError(error); }
}

export async function PUT(request: Request) {
  try {
    const simulation: any = await request.json();
    const promise = await executeScript(simulation);

    return NextResponse.json(promise, { status: 200 });
  } catch (error) { return returnError(error); }
}

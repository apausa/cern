/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

// Types
import { Metadata } from '@/types/dashboard';
import { PostMetadata } from '@/types/metadata';

// Utils
import getError from '@/utils/getError';
import { createMetadata, createScript } from '@/utils/buildScript';

export async function POST(request: Request): Promise<PostMetadata> {
  try {
    const { o2CmdStr, version }: any = await request.json();
    const createdMetadata: Metadata = await createMetadata(o2CmdStr, version);

    await createScript(createdMetadata.testScript);
    await createScript(createdMetadata.prodScript);

    return NextResponse.json(createdMetadata, { status: 200 });
  } catch { return getError(); }
}

// export async function PUT(request: Request): Promise<DashboardPut> {
//   try {
//     const unresolvedSimulation: Simulation = await request.json();

//     // @develop Update unresolvedSimulation in DD. BB. ("PENDING")

//     const resolvedSimulation: Simulation = (unresolvedSimulation.testStatus === 'FULFILLED')
//       ? await runScriptInProd(unresolvedSimulation)
//       : await runScriptInTest(unresolvedSimulation);

//     // @develop Update resolvedSimulation in DD. BB. ("FULFILLED | "REJECTED")

//     return NextResponse.json(resolvedSimulation, { status: 200 });
//     // @develop, when error, return error and also reject simulation promise
//   } catch (error: unknown) { return getError(error); }
// }

// export async function POST(): Promise<PostAllMetadata> {
//   try {
//     localStorage.setItem('allMetadata', JSON.stringify([]));

//     return NextResponse.json(null, { status: 200 });
//   } catch (error: unknown) { return getError(error); }
// }

/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

// Types
import { Metadata } from '@/types/dashboard';
import { PostMetadata, PutMetadata } from '@/types/metadata';

// Utils
import getError from '@/utils/getError';
import { createMetadata, createScript } from './buildScript';
import { runProdScript, runTestScript } from './runScript';

export async function POST(request: Request): Promise<PostMetadata> {
  try {
    const { o2CmdStr, version }: any = await request.json();
    const createdMetadata: Metadata = await createMetadata(o2CmdStr, version);
    await createScript(createdMetadata.testScript);
    await createScript(createdMetadata.prodScript);

    return NextResponse.json(createdMetadata, { status: 200 });
  } catch { return getError(); }
}

export async function PUT(request: Request): Promise<PutMetadata> {
  try {
    const unresolvedMetadata: Metadata = await request.json();
    const resolvedMetadata: any = (unresolvedMetadata.testScript.scriptStatus === 'FULFILLED')
      ? await runProdScript(unresolvedMetadata)
      : await runTestScript(unresolvedMetadata);

    return NextResponse.json(resolvedMetadata, { status: 200 });
  } catch { return getError(); }
}

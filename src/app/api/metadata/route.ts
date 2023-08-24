import { NextResponse } from 'next/server';

// Types
import { Metadata, Form } from '@/types/lib';
import { PostMetadata, PutMetadata } from '@/types/app/api';

// Utils
import getError from '@/utils/getError';

// Other
import { createMetadata, createScript } from './buildScript';
import { runProdScript, runTestScript } from './runScript';

export async function POST(request: Request): Promise<PostMetadata> {
  try {
    const form: Form = await request.json();
    const createdMetadata: Metadata = await createMetadata(form);

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

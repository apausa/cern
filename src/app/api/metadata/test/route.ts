import { NextResponse } from 'next/server';
import runScriptInTest from './runScriptInTest';

// Types
import { PutMetadata } from '@/types/app/api';
import { Metadata } from '@/types/lib';

export async function PUT(request: Request): Promise<PutMetadata> {
  const unresolvedMetadata: Metadata = await request.json();

  try {
    const resolvedMetadata: any = await runScriptInTest(unresolvedMetadata);

    return NextResponse.json(resolvedMetadata, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      ...unresolvedMetadata,
      testScript: {
        ...unresolvedMetadata.testScript,
        scriptStatus: 'REJECTED',
        rejectedOutput: (error instanceof Error) ? error.message : null,
      },
    }, { status: 500 });
  }
}

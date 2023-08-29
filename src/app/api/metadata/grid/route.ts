/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import runScriptInGrid from './runScriptInGrid';

// Types
import { PutMetadata } from '@/types/app/api';
import { Metadata } from '@/types/lib';

export async function PUT(request: Request): Promise<PutMetadata> {
  const unresolvedMetadata: Metadata = await request.json();

  try {
    const resolvedMetadata: any = await runScriptInGrid(unresolvedMetadata);

    return NextResponse.json(resolvedMetadata, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      ...unresolvedMetadata,
      gridScript: {
        ...unresolvedMetadata.gridScript,
        scriptStatus: 'REJECTED',
        error: (error instanceof Error) ? error.message : null,
      },
    }, { status: 500 });
  }
}

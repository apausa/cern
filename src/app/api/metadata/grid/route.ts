/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import runScriptInGrid from './runScriptInGrid';

// Types
import { PutMetadata } from '@/types/app/api';
import { Metadata } from '@/types/lib';

// Utils
import getError from '@/utils/getError';

export async function PUT(request: Request): Promise<PutMetadata> {
  try {
    const unresolvedMetadata: Metadata = await request.json();
    const resolvedMetadata: any = await runScriptInGrid(unresolvedMetadata);

    return NextResponse.json(resolvedMetadata, { status: 200 });
  } catch { return getError(); }
}
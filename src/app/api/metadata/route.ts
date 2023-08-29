/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';

// Types
import { Metadata, Form } from '@/types/lib';
import { PostMetadata } from '@/types/app/api';

// Utils
import getError from '@/utils/getError';

// Other
import { createMetadata, createScript } from './buildScript';

export async function POST(request: Request): Promise<PostMetadata> {
  try {
    const form: Form = await request.json();
    const createdMetadata: Metadata = await createMetadata(form);

    await createScript(createdMetadata.testScript);
    await createScript(createdMetadata.gridScript);

    return NextResponse.json(createdMetadata, { status: 200 });
  } catch { return getError(); }
}

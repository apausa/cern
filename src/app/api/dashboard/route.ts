/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

import { BashScript } from '@/types/build';
import executeScript from './executeScript';

export async function POST(request: Request) {
  try {
    const bashScript: BashScript = await request.json();
    const fileName: string = `${uuidv4()}.sh`;
    const filePath: string = path.join('/work/scripts', fileName);
    const promise: Promise<any> = executeScript(bashScript, filePath);

    return NextResponse.json(
      {
        bashScript,
        fileName,
        date: new Date(),
        status: 'pending',
        promise,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

import { BashScript } from '@/types/build';
import createScript from './createScript';
import executeScript from './executeScript';

export async function POST(request: Request) {
  const bashScript: BashScript = await request.json();
  const scriptName: string = uuidv4();
  const filePath: string = path.join('/work/scripts', `${scriptName}.sh`);

  const simulation: any = {
    bashScript, title: scriptName, date: new Date(), status: 'IN_PROGRESS',
  };

  await createScript(bashScript, filePath);
  await executeScript(filePath);

  return NextResponse.json(simulation);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { BashScript } from '@/types/components/dashboard/build';
import createScript from './createScript';

export async function POST(request: Request) {
  const bashScript: BashScript = await request.json();
  const scriptName: string = uuidv4();
  const simulation: any = {
    bashScript, title: scriptName, date: new Date(), status: 'IN_PROGRESS',
  };

  const filePath = await createScript(bashScript, scriptName);

  return NextResponse.json(simulation);
}

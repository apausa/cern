/* eslint-disable prefer-promise-reject-errors */
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import { ChildProcess, spawn } from 'child_process';

// Types
import { BashScript } from '@/types/build';

// Lib
import EXEC_CMD from '@/lib/constants/dashboard';
import returnError from '@/lib/utils/returnError';
import parseObject from '@/lib/utils/parseObject';
import returnPath from '@/lib/utils/returnPath';

export async function POST(request: Request) {
  try {
    const bashScript: BashScript = await request.json();
    const id: string = uuidv4();
    const filePath: string = returnPath(id);

    await fs.writeFile(filePath, parseObject(bashScript));
    await fs.chmod(filePath, '755');

    return NextResponse.json(
      {
        bashScript,
        id,
        date: new Date(),
        status: 'pending',
      },
      { status: 200 },
    );
  } catch {
    return returnError();
  }
}

export async function PUT(request: Request) {
  try {
    const simulation: any = await request.json();
    const { name, args } = EXEC_CMD;
    const childProcess: ChildProcess = await spawn(name, [...args, returnPath(simulation.id)]);

    // @delete
    childProcess.stdout?.on('data', (output: any) => { console.log('data', output.toString()); });

    const promise = await new Promise((resolve: any, reject: any) => {
      childProcess.on('close', () => {
        resolve({ ...simulation, status: 'fulfilled' });
      });
      childProcess.on('error', () => {
        reject({ ...simulation, status: 'rejected' });
      });
    });

    return NextResponse.json(
      { promise },
      { status: 200 },
    );
  } catch {
    return returnError();
  }
}

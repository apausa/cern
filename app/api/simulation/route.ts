import { NextResponse } from 'next/server';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';

// Types
import { Form } from '@/_private/types/lib/formTypes';
import { PostSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { getCurrentDate, getSelectedVersion } from '@/_private/utils/getDate';
import getScript from '@/_private/utils/getScript';
import { getSegment } from '@/_private/utils/api';

export async function POST(request: Request): Promise<PostSimulation> {
  const form: Form = await request.json();

  const getLocalCreateWorkflowBody = (version: string, script: string): string => ([
    `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/${version})`,
    'pip install graphviz',
    script,
  ].join('\n\n'));

  const getLocalRunWorkflowBody = (version: string, script: string): string => ([
    `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/${version})`,
    script,
  ].join('\n\n'));

  const getGridRunWorkflowBody = (version: string, script: string): string => ([
    `#JDL_PACKAGE=O2sim::${version}`,
    '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1',
    script,
  ].join('\n\n'));

  try {
    const version: string = getSelectedVersion(form.version);
    const id: string = uuidv4();
    const segment: string = getSegment(process.env.SCRIPTS_DIRECTORY_PATH!, id);
    const script: string = (form.advanced && form.script !== null)
      ? form.script
      : getScript(form.createWorkflow, form.runWorkflow);

    return NextResponse.json({
      id,
      date: getCurrentDate(),
      form: { ...form, script, title: form.title || id },
      scripts: {
        localCreateWorkflow: {
          scriptPath: path.join(segment, 'localCreateWorkflow.sh'),
          scriptBody: getLocalCreateWorkflowBody(version, script),
          scriptStatus: 'Staged',
          stderrData: null,
          stdoutData: null,
        },
        localRunWorkflow: {
          scriptPath: path.join(segment, 'localRunWorkflow.sh'),
          scriptBody: getLocalRunWorkflowBody(version, script),
          scriptStatus: 'Staged',
          stderrData: null,
          stdoutData: null,
        },
        gridRunWorkflow: {
          scriptPath: path.join(segment, 'gridRunWorkflow.sh'),
          scriptBody: getGridRunWorkflowBody(version, script),
          scriptStatus: 'Staged',
          stderrData: null,
          stdoutData: null,
        },
      },
    }, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<PostSimulation> {
  const id: string = await request.json();

  try {
    const segment: string = getSegment(process.env.SCRIPTS_DIRECTORY_PATH!, id);

    try {
      await fs.access(segment);
      await fs.rm(segment, { recursive: true });
    // eslint-disable-next-line no-empty
    } catch {}

    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

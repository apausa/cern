import { NextResponse } from 'next/server';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

// Types
import { Form } from '@/_private/types/components/formTypes';
import { PostSimulation } from '@/_private/types/app/apiTypes';

// Utils
import { getSelectedVersion } from '@/_private/utils/getDate';
import getScript from '@/_private/utils/getScript';
import { getSegment } from '@/_private/utils/api';

export async function POST(request: Request): Promise<PostSimulation> {
  const form: Form = await request.json();

  const getLocalScriptBody = (version: string, script: string): string => ([
    `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/${version})`, script,
  ].join('\n'));

  const getGridScriptBody = (version: string, script: string): string => ([
    `#JDL_PACKAGE=O2sim::${version}`, '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1', script,
  ].join('\n'));

  try {
    const version: string = getSelectedVersion(form.version);
    const id: string = uuidv4();
    const segment: string = getSegment(id);
    const script: string = (form.advanced && form.script !== null)
      ? form.script
      : getScript(form.createWorkflow, form.runWorkflow);

    return NextResponse.json({
      id,
      date: new Date(),
      form: { ...form, script, title: form.title || id },
      scripts: {
        localCreateWorkflow: {
          scriptPath: path.join(segment, 'localCreateWorkflow.sh'),
          scriptBody: getLocalScriptBody(version, getScript(form.createWorkflow)),
          scriptStatus: null,
          rejectedOutput: null,
          fulfilledOutput: null,
        },
        localRunWorkflow: {
          scriptPath: path.join(segment, 'localRunWorkflow.sh'),
          scriptBody: getLocalScriptBody(version, script),
          scriptStatus: null,
          rejectedOutput: null,
          fulfilledOutput: null,
        },
        gridRunWorkflow: {
          scriptPath: path.join(segment, 'gridRunWorkflow.sh'),
          scriptBody: getGridScriptBody(version, script),
          scriptStatus: null,
          rejectedOutput: null,
          fulfilledOutput: null,
        },
      },
    }, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

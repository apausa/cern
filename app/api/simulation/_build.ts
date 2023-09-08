import * as fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

// Types
import { Form } from '@/_private/types/components/formTypes';
import { GridScript, Simulation, TestScript } from '@/_private/types/components/simulationTypes';

// Utils
import { getSelectedVersion } from '@/_private/utils/getDate';
import getScript from '@/_private/utils/getScript';

const getTestScriptBody = (version: string, o2CmdStr: string): string => ([
  `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/${version})`, o2CmdStr,
].join('\n'));

const getGridScriptBody = (version: string, o2CmdStr: string): string => ([
  `#JDL_PACKAGE=O2sim::${version}`, '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1', o2CmdStr,
].join('\n'));

export const createSimulation = async (form: Form): Promise<Simulation> => {
  const version: string = getSelectedVersion(form.version);
  const id: string = uuidv4();
  const script: string = (form.advanced) ? form.script : getScript(form.buildCmd, form.runCmd);
  const segment: string = path.join(process.env.SCRIPTS_DIRECTORY_PATH!, id);

  await fs.mkdir(segment);
  await fs.chmod(segment, '755');

  return {
    id,
    date: new Date(),
    form: { ...form, script, title: form.title || id },
    testScript: {
      scriptPath: path.join(segment, 'test.sh'),
      scriptBody: getTestScriptBody(version, script),
      scriptStatus: null,
      rejectedOutput: null,
      fulfilledOutput: null,
    },
    gridScript: {
      scriptPath: path.join(segment, 'grid.sh'),
      scriptBody: getGridScriptBody(version, script),
      scriptStatus: null,
      rejectedOutput: null,
      fulfilledOutput: {
        gridDirectory: null,
        localDirectory: null,
        gridUrl: null,
        gridId: null,
      },
    },
  };
};

export const createScript = async (
  { scriptPath, scriptBody }: TestScript | GridScript,
): Promise<void> => {
  await fs.writeFile(scriptPath, scriptBody);
  await fs.chmod(scriptPath, '755');
};

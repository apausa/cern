import * as fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

import { Metadata, ProdScript, TestScript } from '@/types/dashboard';
import { Form } from '@/types/build';
import { getCurrentDate, getSelectedVersion } from '@/utils/getDate';
import getCmdStr from '@/utils/getCmd';

const getTestScriptBody = (version: string, o2CmdStr: string): string => ([
  `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/${version})`, o2CmdStr,
].join('\n'));

const getProdScriptBody = (version: string, o2CmdStr: string): string => ([
  `#JDL_PACKAGE=O2sim::${version}`, '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1', o2CmdStr,
].join('\n'));

export const createMetadata = async ({
  selectedDate, cmdObj, cmdStr, advanced,
}: Form): Promise<Metadata> => {
  const version = getSelectedVersion(selectedDate);
  const id = uuidv4();
  const cmd = (advanced) ? cmdStr : getCmdStr(cmdObj);
  const segment: string = path.join(process.env.SCRIPTS_DIRECTORY_PATH!, id);

  await fs.mkdir(segment);
  await fs.chmod(segment, '755');

  return {
    id,
    date: getCurrentDate(),
    form: {
      selectedDate,
      cmdObj,
      cmdStr: cmd,
      advanced,
    },
    testScript: {
      scriptPath: path.join(segment, 'test.sh'),
      scriptBody: getTestScriptBody(version, cmd),
      scriptStatus: null,
    },
    prodScript: {
      scriptPath: path.join(segment, 'prod.sh'),
      scriptBody: getProdScriptBody(version, cmd),
      scriptStatus: null,
    },
  };
};

export const createScript = async (
  { scriptPath, scriptBody }: TestScript | ProdScript,
): Promise<void> => {
  await fs.writeFile(scriptPath, scriptBody);
  await fs.chmod(scriptPath, '755');
};

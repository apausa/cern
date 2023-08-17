import * as fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

import { Metadata, ProdScript, TestScript } from '@/types/dashboard';

const getTestScriptBody = (version: string, o2CmdStr: string): string => ([
  `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v${version}-1)`, o2CmdStr,
].join('\n'));

const getProdScriptBody = (version: string, o2CmdStr: string): string => ([
  `#JDL_PACKAGE=O2sim::v${version}-1`, '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1', o2CmdStr,
].join('\n'));

export const createMetadata = async (o2CmdStr: string, version: string): Promise<Metadata> => {
  const id = uuidv4();
  const segment: string = path.join('/home/papausac/work/scripts', id);

  await fs.mkdir(segment);
  await fs.chmod(segment, '755');

  return {
    id,
    date: new Date(),
    o2Cmd: o2CmdStr,
    version,
    testScript: {
      scriptPath: path.join(segment, 'test.sh'),
      scriptBody: getTestScriptBody(version, o2CmdStr),
      scriptStatus: null,
    },
    prodScript: {
      scriptPath: path.join(segment, 'prod.sh'),
      scriptBody: getProdScriptBody(version, o2CmdStr),
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

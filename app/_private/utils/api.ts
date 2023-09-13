import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  Script,
} from '@/_private/types/lib/simulationTypes';
import { LocalRunArgs } from '../types/app/apiTypes';

export const getSegment = (id: string): string => (
  path.join(process.env.SCRIPTS_DIRECTORY_PATH!, id));

export const createFile = async (
  id: string,
  { scriptPath, scriptBody }: Script,
): Promise<void> => {
  const segment: string = getSegment(id);

  try {
    await fs.access(segment);
  } catch {
    await fs.mkdir(segment);
    await fs.chmod(segment, '755');
  }

  await fs.writeFile(scriptPath, scriptBody);
  await fs.chmod(scriptPath, '755');
};

export const getLocalArgs = (id: string, scriptPath: string): LocalRunArgs => {
  const segment = getSegment(id);

  return [
    'exec',
    '-C',
    '-B',
    `/cvmfs:/cvmfs,${segment}:${segment}`,
    '--pwd',
    `${segment}`,
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c',
    scriptPath,
  ];
};

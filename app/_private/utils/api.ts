import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  Script,
} from '@/_private/types/lib/simulationTypes';
import { LocalRunArgs } from '../types/app/apiTypes';

export const getSegment = (segment1: string, segment2: string): string => (
  path.join(segment1, segment2));

export const readFile = async (workflowPath: string) => (
  fs.readFile(workflowPath, { encoding: 'utf-8' }));

export const createFile = async (
  segment: string,
  { scriptPath, scriptBody }: Script,
): Promise<void> => {
  try {
    await fs.access(segment);
  } catch {
    await fs.mkdir(segment);
    await fs.chmod(segment, '755');
  }

  await fs.writeFile(scriptPath, scriptBody);
  await fs.chmod(scriptPath, '755');
};

export const getLocalArgs = (segment: string, scriptPath: string): LocalRunArgs => [
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

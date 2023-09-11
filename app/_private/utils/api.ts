import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  Script, Simulation,
} from '@/_private/types/components/simulationTypes';

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

export const getRejectedSimulation = (
  simulation: Simulation,
  script: 'gridRunWorkflow' | 'localRunWorkflow' | 'localCreateWorkflow',
  error: unknown,
) => ({
  ...simulation,
  scripts: {
    ...simulation.scripts,
    [script]: {
      ...simulation.scripts[script],
      scriptStatus: 'REJECTED',
      rejectedOutput: (error instanceof Error) ? error.message : null,
    },
  },
});

export const getResolvedSimulation = (
  simulation: Simulation,
  script: 'gridRunWorkflow' | 'localRunWorkflow' | 'localCreateWorkflow',
  code: number,
  fulfilledOutput: string[] | null,
) => ({
  ...simulation,
  scripts: {
    ...simulation.scripts,
    [script]: {
      ...simulation.scripts[script],
      scriptStatus: (code === 0) ? 'FULFILLED' : 'REJECTED',
      fulfilledOutput,
      rejectedOutput: (code === 0) ? null : new Error(`grid_submit.sh returned code ${code}`).message,
    },
  },
});

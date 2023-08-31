import { TestExecCmd } from '@/types/app/api';

export const getGridExecCmd = (scriptPath: string): any => ({
  name: process.env.GRID_SUBMIT_PATH,
  args: ['--script', scriptPath, '--wait', '--fetch-output-files'],
});

export const TEST_EXEC_CMD: TestExecCmd = {
  name: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  args: [
    'exec',
    '-C',
    '-B',
    `/cvmfs:/cvmfs,${process.env.WORK_DIRECTORY_PATH}:${process.env.WORK_DIRECTORY_PATH}`,
    '--pwd',
    `${process.env.WORK_DIRECTORY_PATH}`,
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c'],
};

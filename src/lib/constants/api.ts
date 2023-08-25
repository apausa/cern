import { GridVersionCmd, TestExecCmd } from '@/types/app/api';

export const GRID_VERSION_CMD = (version: string): GridVersionCmd => ({
  name: '/cvmfs/alice.cern.ch/bin/alienv',
  args: ['enter', `O2sim/${version}`],
});

export const GRID_EXEC_CMD = (scriptPath: string): string => [
  `${process.env.GRID_SUBMIT_PATH}`, '--script', scriptPath, '--wait', '--fetch-output-files',
].join(' ');

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

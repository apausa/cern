import { ProdVersionCmd, TestExecCmd } from '@/types/api';

export const prodVersionCmd = (version: string): ProdVersionCmd => ({
  name: '/cvmfs/alice.cern.ch/bin/alienv',
  args: ['enter', `O2sim/${version}`],
});

export const prodExecCmd = (scriptPath: string): string => [
  `${process.env.GRID_SUBMIT_PATH}`, '--script', scriptPath, '--wait', '--fetch-output-files',
].join(' ');

export const testExecCmd: TestExecCmd = {
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

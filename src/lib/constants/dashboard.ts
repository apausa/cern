import { ProdExecCmd, TestExecCmd } from '@/types/dashboard';

export const testExecCmd: TestExecCmd = {
  name: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  args: [
    'exec',
    '-C',
    '-B',
    '/cvmfs:/cvmfs,/tmp:/tmp,/home/papausac/work:/home/papausac/work',
    '--pwd',
    '/home/papausac/work',
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c'],
};

export const prodExecCmd: ProdExecCmd = {
  name: './grid_submit.sh',
  args: ['--script', null, '--wait', '--fetch-output-files'],
};

import { Metadata } from 'next';
import { NextResponse } from 'next/server';

export type PostMetadata = NextResponse<Metadata | unknown>;

export type PutMetadata = NextResponse<Metadata | unknown>;

export type TestExecCmd = {
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
    '-c']
};

export type ProdAlienvCmd = {
  name: '/cvmfs/alice.cern.ch/bin/alienv',
  args: ['enter', string],
};

export type ProdExecCmd = {
  name: './grid_submit.sh',
  args: ['--script', string, '--wait', '--fetch-output-files'],
};

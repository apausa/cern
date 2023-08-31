import { NextResponse } from 'next/server';
import { Metadata } from '../lib';

export type PostMetadata = NextResponse<Metadata | unknown>;

export type PutMetadata = NextResponse<Metadata>;

export type TestExecCmd = {
  name: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  args: [
    'exec',
    '-C',
    '-B',
    `/cvmfs:/cvmfs,${string}:${string}`,
    '--pwd',
    string,
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c']
};

export type GridExecCmd = {
  name: string,
  args: ['--script', string, '--wait', '--fetch-output-files'],
};

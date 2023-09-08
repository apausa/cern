import { NextResponse } from 'next/server';
import { Simulation } from '@/_private/types/components/simulationTypes';

export type PostSimulation = NextResponse<Simulation | unknown>;

export type PutSimulation = NextResponse<Simulation>;

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

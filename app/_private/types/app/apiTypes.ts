import { NextResponse } from 'next/server';
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Routes

export type ApiGridRunWorkflow = '/api/simulation/gridRunWorkflow';
export type ApiLocalRunWorkflow = '/api/simulation/localRunWorkflow';
export type ApiLocalCreateWorkflow = '/api/simulation/localCreateWorkflow';
export type ApiSimulation = '/api/simulation/';

// Other

export type ApptainerPath = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';

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

export type GridRunArgs = ['--script', string, '--wait', '--fetch-output-files'];
export type LocalRunArgs = [
  'exec',
  '-C',
  '-B',
  string,
  '--pwd',
  string,
  '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
  '/bin/bash',
  '-c',
  string,
];

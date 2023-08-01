import { Dispatch } from 'react';

// Types
import { NextResponse } from 'next/server';
import { BashScript } from './build';

// Exec command

export type ExecCmd = {
  name: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  args: [
    'exec',
    '-C',
    '-B',
    '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work',
    '--pwd',
    '/work',
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c']
};

// Reducer

export type Simulation = {
  bashScript: BashScript,
  id: string,
  date: Date,
  status: 'PENDING' | 'FULFILLED' | 'REJECTED'
};

export type DashboardState = Simulation[];

export type DashboardUseReducer = [DashboardState, Dispatch<any>];

// Actions

export type DashboardCreateAction = {
  type: 'CREATE_SIMULATION';
  simulation: Simulation,
};

export type DashboardUpdateAction = {
  type: 'UPDATE_SIMULATION';
  simulation: Simulation,
};

// API

export type DashboardPost = NextResponse<Simulation | unknown>;

export type DashboardPut = NextResponse<Simulation | unknown>;

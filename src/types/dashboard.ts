import { Dispatch, SyntheticEvent } from 'react';

import { NextResponse } from 'next/server';

// Exec command

export type ExecCmd = {
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

// Reducer

export type Simulation = {
  bashScript: any,
  id: string,
  date: Date,
  testStatus: 'PENDING' | 'FULFILLED' | 'REJECTED' | null,
  prodStatus: 'PENDING' | 'FULFILLED' | 'REJECTED' | null,
};

export type DashboardState = Simulation[];

export type DashboardUseReducer = [DashboardState, Dispatch<any>];

// Actions

export type DashboardActions = DashboardCreateAction | DashboardUpdateAction;

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

// Functions

export type HandleCreateSimulation = (
  event: SyntheticEvent, simulation: any
) => Promise<void>;

export type HandleUpdateSimulation = (
  simulation: Simulation
) => Promise<void>;

import { Dispatch } from 'react';

// Reducer

export type Metadata = {
  id: string,
  date: Date,
  testScript: TestScript,
  prodScript: ProdScript
};

export type TestScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: 'PENDING' | 'FULFILLED' | 'REJECTED' | null,
};

export type ProdScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: 'PENDING' | 'FULFILLED' | 'REJECTED' | null,
};

export type DashboardState = Metadata[];

export type DashboardUseReducer = [DashboardState, Dispatch<DashboardActions>];

// Exec command

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

export type ProdExecCmd = {
  name: './grid_submit.sh',
  args: ['--script', string | null, '--wait', '--fetch-output-files'],
};

// Actions

export type DashboardActions = DashboardCreateAction
| DashboardUpdateAction
| DashboardGetAllAction;

export type DashboardCreateAction = {
  type: 'CREATE_METADATA';
  metadata: Metadata,
};

export type DashboardUpdateAction = {
  type: 'UPDATE_METADATA';
  metadata: Metadata,
};

export type DashboardGetAllAction = {
  type: 'READ_ALL_METADATA',
  allMetadata: Metadata[],
};

// Functions

export type HandleCreateMetadata = (
  parsedO2Cmd: string, version: string
) => Promise<void>;

export type HandleUpdateMetadata = (
  metadata: Metadata
) => Promise<void>;

export type HandleAllMetadata = () => void;

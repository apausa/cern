import { Dispatch } from 'react';

// Reducer

export type Metadata = {
  id: string,
  version: string,
  o2Cmd: string,
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

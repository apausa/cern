import { Dispatch } from 'react';
import { Status } from '@/_types/utils';
import { Form } from './formTypes';

// CONSTANT

export type Simulation = {
  id: string,
  date: Date,
  form: Form,
  testScript: TestScript,
  gridScript: GridScript
};

export type TestScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
  rejectedOutput: string | null,
  fulfilledOutput: null,
};

export type GridScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
  rejectedOutput: string | null,
  fulfilledOutput: Outputs,
};

export type Outputs = {
  gridDirectory: string | null,
  localDirectory: string | null,
  gridUrl: string | null,
  gridId: string | null
};

// REDUCER

export type SimulationsUseReducer = [Simulation[], Dispatch<SimulationAction>];

// ACTIONS

export type SimulationAction = ReadAllSimulationAction |
CreateSimulationAction |
UpdateSimulationAction |
DeleteSimulationAction;

export type ReadAllSimulationAction = { type: 'READ_ALL_SIMULATIONS', simulations: Simulation[] };
export type CreateSimulationAction = { type: 'CREATE_SIMULATION', simulation: Simulation };
export type UpdateSimulationAction = { type: 'UPDATE_SIMULATION', simulation: Simulation };
export type DeleteSimulationAction = { type: 'DELETE_SIMULATION', simulation: Simulation };

export type SimulationActionCreators = {
  readAllSimulations: (
    dispatch: React.Dispatch<ReadAllSimulationAction>
  ) => void,
  createSimulation: (
    dispatch: React.Dispatch<CreateSimulationAction>,
    form: Form) => Promise<void>,
  updateSimulationTestStatus: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation,
    status: Status) => void,
  updateSimulationGridStatus: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation,
    status: Status) => void,
  executeSimulationInTest: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation) => Promise<void>,
  executeSimulationInGrid: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation
  ) => Promise<void>,
};

// COMPONENTS

export type DetailsProps = any;
export type GridTabProps = any;
export type TestTabProps = any;
export type FulfilledOutputProps = any;
export type RejectedOutputProps = any;
export type ReadOnlyInputProps = any;
export type ReadOnlyTextArea = any;

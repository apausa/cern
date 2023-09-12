import { Dispatch } from 'react';
import { Status } from '@/_private/types/utils';
import { Form } from './formTypes';

// CONSTANT

export type Simulation = {
  id: string,
  date: Date,
  form: Form,
  scripts: {
    localRunWorkflow: Script,
    localCreateWorkflow: Script,
    gridRunWorkflow: Script,
  }
};

export type Script = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
  stderrData: string | null,
  stdoutData: string | null,
};

// REDUCER

export type UseReducer = [Simulation[], Dispatch<SimulationAction>];

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
  updateSimulationScriptStatus: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation,
    script: 'localRunWorkflow' | 'localCreateWorkflow' | 'gridRunWorkflow',
    status: Status) => void,
  runSimulationScript: (
    dispatch: React.Dispatch<UpdateSimulationAction>,
    simulation: Simulation,
    script: 'localRunWorkflow' | 'localCreateWorkflow' | 'gridRunWorkflow'
  ) => void,
};

// COMPONENTS

export type DetailsProps = any;
export type GridTabProps = any;
export type StdoutDataProps = any;
export type StderrDataProps = any;
export type ReadOnlyInputProps = any;
export type ReadOnlyTextArea = any;

// export type Outputs = {
//   gridDirectory: string | null,
//   localDirectory: string | null,
//   gridUrl: string | null,
//   gridId: string | null
// };

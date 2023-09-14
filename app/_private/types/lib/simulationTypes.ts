import { Dispatch } from 'react';
import { Status } from '@/_private/types/utils';
import { Form } from './formTypes';

// CONSTANT

export type Simulation = {
  id: string,
  date: string,
  form: Form,
  scripts: {
    localRunWorkflow: Script,
    localCreateWorkflow: Script & { graphvizData: string | null },
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

export type ReadAllSimulation = (
  dispatch: React.Dispatch<ReadAllSimulationAction>
) => void;
export type CreateSimulation = (
  dispatch: React.Dispatch<CreateSimulationAction>,
  form: Form
) => Promise<void>;
export type UpdateSimulationScriptStatus = (
  dispatch: React.Dispatch<UpdateSimulationAction>,
  simulation: Simulation,
  script: 'localRunWorkflow' | 'localCreateWorkflow' | 'gridRunWorkflow',
  status: Status
) => void;
export type RunSimulationScript = (
  dispatch: React.Dispatch<UpdateSimulationAction>,
  simulation: Simulation,
  script: 'localRunWorkflow' | 'localCreateWorkflow' | 'gridRunWorkflow'
) => void;

export type SimulationActionCreators = {
  readAllSimulations: ReadAllSimulation,
  createSimulation: CreateSimulation,
  updateSimulationScriptStatus: UpdateSimulationScriptStatus,
  runSimulationScript: RunSimulationScript
};

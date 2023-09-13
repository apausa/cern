import {
  ApiGridRunWorkflow,
  ApiLocalCreateWorkflow,
  ApiLocalRunWorkflow,
  ApiSimulation,
  ApptainerPath,
} from '@/_private/types/app/apiTypes';

export const APPTAINER_PATH: ApptainerPath = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';

export const API_GRID_RUN_WORKFLOW: ApiGridRunWorkflow = '/api/simulation/gridRunWorkflow';
export const API_LOCAL_RUN_WORKFLOW: ApiLocalRunWorkflow = '/api/simulation/localRunWorkflow';
export const API_LOCAL_CREATE_WORKFLOW: ApiLocalCreateWorkflow = '/api/simulation/localCreateWorkflow';
export const API_SIMULATION: ApiSimulation = '/api/simulation/';

import {
  ApiGridRunWorkflow, ApiLocalCreateWorkflow, ApiLocalRunWorkflow, ApiSimulation, TestExecCmd,
} from '@/_private/types/app/apiTypes';

export const TEST_EXEC_CMD: TestExecCmd = {
  name: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  args: [
    'exec',
    '-C',
    '-B',
    `/cvmfs:/cvmfs,${process.env.WORK_DIRECTORY_PATH}:${process.env.WORK_DIRECTORY_PATH}`,
    '--pwd',
    `${process.env.WORK_DIRECTORY_PATH}`,
    '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    '/bin/bash',
    '-c'],
};

export const API_GRID_RUN_WORKFLOW: ApiGridRunWorkflow = '/api/simulation/gridRunWorkflow';
export const API_LOCAL_RUN_WORKFLOW: ApiLocalRunWorkflow = '/api/simulation/localRunWorkflow';
export const API_LOCAL_CREATE_WORKFLOW: ApiLocalCreateWorkflow = '/api/simulation/localCreateWorkflow';
export const API_SIMULATION: ApiSimulation = '/api/simulation/';

// export const GRID_DIRECTORY_REGEXP: RegExp = /Your job's working directory will be (.+)/;
// export const LOCAL_DIRECTORY_REGEXP: RegExp = /Local working directory is (.+)/;
// export const GRID_URL_REGEXP: RegExp = /OK, display progress on (.+)/;
// export const GRID_ID_REGEXP: RegExp = /Preparing job "(.+)"/;

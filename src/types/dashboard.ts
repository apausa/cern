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

export type DashboardAction = {
  type: 'CREATE_SIMULATION' | 'READ_ALL_SIMULATIONS' | 'UPDATE_SIMULATION' | 'DELETE_SIMULATION';
  simulation: any, // @develop
};

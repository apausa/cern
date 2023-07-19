export const buildConstants = {
  CHECK_INPUT: 'CHECK_INPUT',
  UNCHECK_INPUT: 'UNCHECK_INPUT',
};

export const initialArgument = {
  command: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  arguments: {
    argument0: { value: 'exec', status: true },
    argument1: { value: '-C', status: true },
    argument2: { value: '-B', status: true },
    argument3: { value: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work', status: true },
    argument4: { value: '--pwd', status: true },
    argument5: { value: '/work', status: true },
    argument6: { value: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503', status: true },
    argument7: { value: '/bin/bash', status: true },
    argument8: { value: '-c', status: true },
    argument9: { value: '/work/script.sh', status: true },
  },
};

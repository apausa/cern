export const buildConstants = {
  UPDATE_INPUT: 'UPDATE_INPUT',
};

export const initialArgument = {
  command: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  clientArgs: [
    { description: 'exec', status: true },
    { description: '-C', status: true },
    { description: '-B', status: true },
    { description: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work', status: true },
    { description: '--pwd', status: true },
    { description: '/work', status: true },
    { description: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503', status: true },
    { description: '/bin/bash', status: true },
    { description: '-c', status: true },
    { description: '/work/script.sh', status: true },
  ],
};

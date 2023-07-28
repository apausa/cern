const execScript = {
  command: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
  clientArgs: {
    arg1: 'exec',
    arg2: '-C',
    arg3: '-B',
    arg4: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work',
    arg5: '--pwd',
    arg6: '/work',
    arg7: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    arg8: '/bin/bash',
    arg9: '-c',
    arg10: '/work/scripts/script.sh',
  },
};

export default execScript;

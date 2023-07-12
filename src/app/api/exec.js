const simulation = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer exec -C -B /cvmfs:/cvmfs,/tmp:/tmp,/work:/work --pwd /work /cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503 /bin/bash -c /work/script.sh';

const { exec } = require('child_process');

exec(simulation, (error, stdout, stderr) => {
  if (error instanceof Error) console.error(error);
  else if (stderr) console.error(stderr);
  else console.log(stdout);
});

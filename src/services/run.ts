// import axios from 'axios';

export default async function runSimulation() {
  const command = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';
  const argumentsObject: any = {
    arg0: 'exec',
    arg1: '-C',
    arg2: '-B',
    arg3: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work',
    arg4: '--pwd',
    arg5: '/work',
    arg6: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
    arg7: '/bin/bash',
    arg8: '-c',
    arg9: '/work/script.sh',
  };

  const argumentsArray = Object.keys(argumentsObject).map(((entry) => argumentsObject[entry]));
  const config = { command, argumentsArray };
  const response = await fetch('/api/spawn', {
    method: 'POST',
    body: JSON.stringify(config),
  });

  console.log('response', response);
}

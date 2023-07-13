// import axios from 'axios';

export default async function getSimulation() {
  const command = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';
  const argumentsObject = {
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

  const argumentsArray = [{ ...argumentsObject }];

  const url = '/api/spawn';
  const config = { command, argumentsArray };
  //   const response = await axios.post(url, config);

  console.log(url, config);
  // return response;
}

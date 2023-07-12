const command = '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer';
const arg0 = 'exec';
const arg1 = '-C';
const arg2 = '-B';
const arg3 = '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work'; // Folder with bash script
const arg4 = '--pwd';
const arg5 = '/work'; // Folder with bash script
const arg6 = '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503';
const arg7 = '/bin/bash';
const arg8 = '-c';
const arg9 = '/work/script.sh'; // Bash script

const { spawn } = require('child_process');

const simulation = spawn(command, [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);

simulation.stdout.on('data', (output) => { console.log(output.toString()); });
simulation.stderr.on('data', (output) => { console.error(output.toString()); });
simulation.on('error', (output) => { console.error(output.toString()); });
simulation.on('close', (output) => { console.log(output.toString()); });

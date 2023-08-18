import { O2CmdObj } from '@/types/build';
import { ProdAlienvCmd } from '@/types/metadata';

export const getO2CmdStr = ({ name, args }: O2CmdObj): string => (
  [name, ...args.reduce((acc: (string | number)[], val: any): (string | number)[] => (
    acc.concat(val.selected ? [val.name, val.value] : [])), [])]).join(' ');

export const getProdAlienvCmd = (version: string): ProdAlienvCmd => ({
  name: '/cvmfs/alice.cern.ch/bin/alienv',
  args: ['enter', `O2sim/v${version}-1`],
});

export const getProdExecCmd = (scriptPath: string): string => [
  '/home/papausac/work/grid_submit.sh', '--script', scriptPath, '--wait', '--fetch-output-files',
].join(' ');

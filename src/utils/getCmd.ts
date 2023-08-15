import { O2CmdObj } from '@/types/build';

export const getVersionTestCmd = (parsedDate: string): string[] => [
  `eval $(/cvmfs/alice.cern.ch/bin/alienv printenv O2sim/v${parsedDate}-1)`,
];

export const getVersionProdCmd = (parsedDate: string): string[] => [
  `#JDL_PACKAGE=O2sim::v${parsedDate}-1`, '#JDL_OUTPUT=*.root@disk=1,*.log@disk=1',
];

export const getO2Cmd = ({ name, args }: O2CmdObj): string => (
  [name, ...args.reduce((acc: (string | number)[], val: any): (string | number)[] => (
    acc.concat(val.checked ? [val.name, val.value] : [])), [])]).join(' ');

import { CmdArg, CmdObj } from '@/types/lib';

const getCmdStr = ({ name, args }: CmdObj): string => (
  [name, ...args.reduce((acc: (string | number)[], val: CmdArg): (string | number)[] => (
    acc.concat(val.selected ? [val.name, val.value] : [])), [])]).join(' ');

export default getCmdStr;
